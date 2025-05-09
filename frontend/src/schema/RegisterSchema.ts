import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
