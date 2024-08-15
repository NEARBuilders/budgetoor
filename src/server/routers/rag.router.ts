import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { RagService } from '../libraries/rag'

/**
 * @provider RagRouter
 * @description An AI RAG library to load a file and query it.
 * @function {({ url: string }) => Promise<{ id: string, vectorId: string }>} loadFile - Send a file url that will be downloaded and stored in the RAG context. It returns the id in the database and the vectorId which is a hash of the url.
 * @function {({ vectorId: string, prompt: string, history?: string[] }) => Promise<{ answer: string}>} generateText - Send a  prompt about a loaded file in the RAG context (identified by vectorId) and get an AI answer to the prompt. Can also receives a history of messages for continous conversation with the AI.
 * @usage `const { mutateAsync: loadFile } = Api.rag.loadFile.useMutation(); const { mutateAsync: generateText } = Api.rag.generateText.useMutation(); const { vectorId } = loadFile({ url }); generateText({ prompt: 'What is the title of the document?', vectorId }).then(response => response.answer);`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */
export const RagRouter = Trpc.createRouter({
  loadFile: Trpc.procedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const ragVector = await RagService.createAndSaveFile(input.url)

        return { id: ragVector.id, vectorId: ragVector.vectorId }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not load file / web page: ${error.message}`,
        })
      }
    }),

  generateText: Trpc.procedure
    .input(
      z.object({
        vectorId: z.string(),
        prompt: z.string(),
        history: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const answer = await RagService.queryFile(
          input.vectorId,
          input.prompt,
          input.history,
        )

        return { answer }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not query: ${error.message}`,
        })
      }
    }),
})
