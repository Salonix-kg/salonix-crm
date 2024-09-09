import z from 'zod';

import {required} from '@utils/formHelpers.ts';

export const serviceDrawerSchema = z.object({
  title: z.string({required_error: required()}),
  category: z.string({required_error: required()}),
  description: z.string().optional(),
  duration: z.number({required_error: required()}),
  price: z.number({required_error: required()}),
});

export type ServiceDrawerSchema = z.infer<typeof serviceDrawerSchema>;
