import { z } from 'zod'

export const emailSchema = z.string().email()

export const passwordSchema = z
  .string()
  .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  .max(32, { message: 'Mật khẩu không được vượt quá 32 ký tự' })

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  age: z.number().min(18, { message: 'Bạn phải trên 18 tuổi' }),
})

export function validateUser(data: { email: string, password: string, age: number }) {
  return userSchema.safeParse(data)
}
