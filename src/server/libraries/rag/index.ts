import { Database } from '@/core/database'
import { FileHelper } from '@/core/helpers/file'
import { Utility } from '@/core/helpers/utility'
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib'
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import axios from 'axios'
import * as cheerio from 'cheerio'
import * as crypto from 'crypto'
import * as fs from 'fs'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import mammoth from 'mammoth'
import Papaparse from 'papaparse'
import PdfParse from 'pdf-parse'

const downloadFile = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const dataBuffer = Buffer.from(response.data, 'binary')
    return dataBuffer
  } catch (error) {
    throw new Error(`Could not dowload file at "${url}"`)
  }
}

const downloadWebPage = async (url: string) => {
  try {
    const response = await axios.get(url)

    const $ = cheerio.load(response.data)

    const textContent = $('body').text()

    return textContent.split('\n').filter(line => Utility.isDefined(line))
  } catch (error) {
    throw new Error(`Could not fetch web page: ${error.message}`)
  }
}

const parsePDF = async (buffer: Buffer) => {
  const data = await PdfParse(buffer)

  return data.text.split('\n').filter(line => Utility.isDefined(line))
}

const parseCSV = async (buffer: Buffer): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    Papaparse.parse(buffer.toString(), {
      complete: results => {
        const content = JSON.stringify(results)
        const lines = content
          .split('\n')
          .filter(line => Utility.isDefined(line))
        resolve(lines)
      },
      error: error => {
        reject(error)
      },
    })
  })
}

const parseDOCX = async (buffer: Buffer) => {
  const result = await mammoth.extractRawText({ buffer: buffer })
  return result.value.split('\n').filter(line => Utility.isDefined(line))
}

const buildDocuments = async (lines: string[]) => {
  const MAX_LINES = 10000 // Security to avoid loading huge files

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
    separators: ['\n'],
  })

  const texts = lines.slice(0, MAX_LINES)

  const documents = await textSplitter.createDocuments([texts.join('\n')])

  return documents
}

const createHash = (input: string) => {
  const hash = crypto.createHash('sha256').update(input).digest('base64')
  return hash.slice(0, 8)
}

const createRetriever = async (vectorStore: HNSWLib, model: ChatOpenAI) => {
  const retriever = vectorStore.asRetriever()

  const contextualizeQSystemPrompt = `
Given a chat history and the latest user question
which might reference context in the chat history,
formulate a standalone question which can be understood
without the chat history. Do NOT answer the question, just
reformulate it if needed and otherwise return it as is.`

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ['system', contextualizeQSystemPrompt],
    new MessagesPlaceholder('chat_history'),
    ['human', '{input}'],
  ])

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  })

  return historyAwareRetriever
}

const createPromptSystem = () => {
  const system = `
You are an assistant for question-answering tasks. Use
the following pieces of retrieved context to answer the
question. If you don't know the answer, just say that you
don't know. Use three sentences maximum and keep the answer
concise.
\n\n
{context}`

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', system],
    new MessagesPlaceholder('chat_history'),
    ['human', '{input}'],
  ])

  return prompt
}

class Service {
  private model: ChatOpenAI

  private embeddings: OpenAIEmbeddings

  private pathVectors = FileHelper.getRoot() + `/tmp/rag/vectors`

  constructor() {
    try {
      const apiKey = process.env.SERVER_OPENAI_API_KEY

      if (!apiKey) {
        console.log(
          `Set SERVER_OPENAI_API_KEY in your .env to activate RAG library`,
        )
        return
      }

      this.model = new ChatOpenAI({
        openAIApiKey: apiKey,
        model: 'gpt-3.5-turbo-0125',
        temperature: 0,
      })

      this.embeddings = new OpenAIEmbeddings({
        openAIApiKey: apiKey,
      })
    } catch (error) {
      console.error(`Could not start Rag library: ${error.message}`)
    }
  }

  async createAndSaveFile(url: string) {
    const vectorId = createHash(url)

    const ragVectorFound = await Database.getUnprotected().ragVector.findFirst({
      where: {
        vectorId,
      },
    })

    if (ragVectorFound) {
      console.log(`Vector already exists for "${url}".`)

      return ragVectorFound
    }

    const type = FileHelper.getFileType(url)

    let lines: string[]

    if (type === 'unknown') {
      lines = await downloadWebPage(url)
    } else {
      const buffer = await downloadFile(url)

      switch (type) {
        case 'pdf':
          lines = await parsePDF(buffer)
          break
        case 'csv':
          lines = await parseCSV(buffer)
          break
        case 'docx':
          lines = await parseDOCX(buffer)
          break
        default:
          throw new Error(
            `File type is not supported. Supported types are PDF, DOCX, CSV and web pages`,
          )
      }
    }

    const documents = await buildDocuments(lines)

    const vectorStore = await HNSWLib.fromDocuments(documents, this.embeddings)

    const pathVector = `${this.pathVectors}/${vectorId}`

    await vectorStore.save(pathVector)

    const argsJson = fs.readFileSync(`${pathVector}/args.json`)
    const docstoreJson = fs.readFileSync(`${pathVector}/docstore.json`)
    const hnswlibIndex = fs.readFileSync(`${pathVector}/hnswlib.index`)

    const ragVector = await Database.getUnprotected().ragVector.create({
      data: {
        vectorId,
        argsJson,
        docstoreJson,
        hnswlibIndex,
      },
    })

    FileHelper.deleteFolder(this.pathVectors)

    return ragVector
  }

  async queryFile(vectorId: string, prompt: string, history: string[] = []) {
    const ragVector =
      await Database.getUnprotected().ragVector.findFirstOrThrow({
        where: { OR: [{ id: vectorId }, { vectorId: vectorId }] },
      })

    const pathVector = `${this.pathVectors}/${ragVector.vectorId}`

    FileHelper.writeFile(`${pathVector}/args.json`, ragVector.argsJson)
    FileHelper.writeFile(`${pathVector}/docstore.json`, ragVector.docstoreJson)
    FileHelper.writeFile(`${pathVector}/hnswlib.index`, ragVector.hnswlibIndex)

    const vectorStore = await HNSWLib.load(pathVector, this.embeddings)

    const retriever = await createRetriever(vectorStore, this.model)

    const promptSystem = createPromptSystem()

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: this.model,
      prompt: promptSystem,
    })

    const ragChain = await createRetrievalChain({
      retriever: retriever,
      combineDocsChain: questionAnswerChain,
    })

    const MAX_HISTORY = 20
    const chat_history: BaseMessage[] = history
      .slice(0, MAX_HISTORY)
      .map((content, index) =>
        index % 2 === 0 ? new HumanMessage(content) : new AIMessage(content),
      )

    const response = await ragChain.invoke({
      chat_history,
      input: prompt,
    })

    FileHelper.deleteFolder(this.pathVectors)

    return response.answer
  }
}

class Singleton {
  static service = new Service()
}

export const RagService = Singleton.service
