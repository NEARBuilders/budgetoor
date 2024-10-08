import { Budget } from "@/app/types";
import { swagger } from "@elysiajs/swagger";
import axios from "axios";
import { Elysia } from "elysia";
import { Readable } from "stream";

const API_KEY = process.env.WORDWARE_API_KEY;
const API_URL = process.env.WORDWARE_API_URL;
const API_VERSION = process.env.WORDWARE_API_VERSION;

// BODY Type

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .post("/budget", async ({ body }: { body: Budget }) => {
    if (!API_KEY) {
      throw new Error("API Key is not set");
    }

    if (!API_URL) {
      throw new Error("API URL is not set");
    }

    const bodyFormatted = {
      inputs: {
        project_details: body.description,
        time_estimates: body.timeEstimate,
        budget_buffers: body.budgetBuffer,
        task_breakdown: body.task_breakdown,
        roles_seniority: body.roles_seniority,
        location: body.location,
        payroll: body.payroll,
        profit_margins: body.profitMargin,
      },
      version: API_VERSION,
    };

    try {
      const response = await axios.post(API_URL, bodyFormatted, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      });

      return new Promise((resolve, reject) => {
        const stream = response.data as Readable;
        let rawData = "";

        stream.on("data", (chunk) => {
          rawData += chunk.toString();
        });

        stream.on("end", () => {
          const lines = rawData.split("\n").filter((line) => line.trim());
          let completeObject: any = null;

          for (const line of lines) {
            try {
              const parsedChunk = JSON.parse(line);
              if (
                parsedChunk.type === "chunk" &&
                parsedChunk.value.state === "complete"
              ) {
                completeObject = parsedChunk.value.output;
                break;
              }
            } catch (error) {
              console.error("Failed to parse JSON:", error);
            }
          }

          if (completeObject) {
            console.log("Complete Object:", completeObject);
            resolve({
              overview: completeObject.overview,
              csv: completeObject.CSV,
            });
          } else {
            console.log("No complete state found. Raw data:", rawData);
            resolve({ error: "No complete state found", rawData });
          }
        });

        stream.on("error", (error) => {
          console.error("Stream error:", error);
          reject(error);
        });
      });
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
