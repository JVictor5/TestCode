import { z } from 'zod';

export const createProductValidation = z.object({
  name: z.string().trim(),
  resumo: z.string().trim(),
  categoryId: z.string().trim(),
  priece: z.string().trim(),
  avatar: z.string().trim()
});

export type ProductParams = z.infer<typeof createProductValidation>;
