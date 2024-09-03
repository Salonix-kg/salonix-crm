import z from 'zod';

import {required} from '@utils/formHelpers.ts';

export const createCategorySchema = z.object({
  title: z.string({required_error: required()}),
  description: z.string().optional(),
  key: z.string().optional(),
  children: z.any(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
