import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),

  password: z
    .string()
    .min(6, { message: 'Password minimal 6 karakter' }),
})

export const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email wajib diisi' })
      .email({ message: 'Format email tidak valid' }),

    password: z
      .string()
      .min(6, { message: 'Password minimal 6 karakter' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Konfirmasi password wajib diisi' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak sama',
    path: ['confirmPassword'],
  })

export default signUpSchema
