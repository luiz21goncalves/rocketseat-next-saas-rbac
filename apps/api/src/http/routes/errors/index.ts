import { z } from 'zod'

export const errorSchema = z.object({
  name: z.string(),
  message: z.string(),
  status_code: z.number()
})

export type ErrorResponseType = z.infer<typeof errorSchema>
