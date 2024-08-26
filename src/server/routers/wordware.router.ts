// src/server/routers/wordware.router.ts

import { Trpc } from '@/core/trpc/server'
import axios from 'axios'
import { z } from 'zod'

const API_KEY = process.env.WORDWARE_API_KEY

export const WordwareRouter = Trpc.createRouter({
  handleCurlRequest: Trpc.procedure
    .input(
      z.object({
        body: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const { body } = input

      if (!API_KEY) {
        console.error('WardWare is not started')
        return
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
        version: '^1.0',
      }

      const response = await axios.post(
        'https://app.wordware.ai/api/released-app/8c7b882d-fdf1-448d-b2a8-3873df0f38af/run',
        bodyFormatted,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (response?.status !== 200) {
        console.error('fail to retrieve')
      }

      const responseData = response?.data
      const lines = responseData.split('\n')
      let completeObject: any = null

      for (const line of lines) {
        try {
          const chunk = JSON.parse(line)
          if (chunk.type === 'chunk' && chunk.value.state === 'complete') {
            completeObject = chunk.value.output
            break
          }
        } catch (error) {
          // Handle or log the error as necessary
          console.error('Failed to parse JSON:', error)
        }
      }

      if (completeObject) {
        console.log('Complete Object:', completeObject)

        return { overview: completeObject.overview, csv: completeObject.CSV }
      } else {
        console.log('No complete state found.')
      }
    }),
})