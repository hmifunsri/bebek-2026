import { z } from 'zod'

export const clubSchema = z.object({
  strTeam: z
    .string()
    .trim(),

  strStadium: z
    .string()
    .trim(),

  intFormedYear: z.coerce
    .number({ message: 'Tahun harus berupa angka' })
    ,

  strBadge: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/.test(value),
      { message: 'URL logo tidak valid (contoh: https://...)' }
    ),
})

export default clubSchema