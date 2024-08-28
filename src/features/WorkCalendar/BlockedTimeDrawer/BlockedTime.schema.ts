import z from 'zod';

import {nullableDayjsSchema} from '@utils/date';
import {required} from '@utils/formHelpers.ts';

export const blockedTimeSchema = z.object({
  title: z.string({required_error: required()}),
  date: nullableDayjsSchema,
  startTime: nullableDayjsSchema,
  endTime: nullableDayjsSchema,
  masterId: z.string({required_error: required()}),
});

export type BlockedTimeSchema = z.infer<typeof blockedTimeSchema>;
