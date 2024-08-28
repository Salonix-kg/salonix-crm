import z from 'zod';

import {nullableDayjsSchema} from '@utils/date';
import {required} from '@utils/formHelpers.ts';

export const orderSchema = z.object({
  masterId: z.number({required_error: required()}),
  date: nullableDayjsSchema,
  startTime: nullableDayjsSchema,
});

export type OrderSchema = z.infer<typeof orderSchema>;
