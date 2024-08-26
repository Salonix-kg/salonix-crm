import dayjs, {Dayjs} from 'dayjs';
import z from 'zod';

import {required} from '@utils/formHelpers.ts';

const nullableDayjsSchema = z.union([
  z.null(),
  z.custom<Dayjs>(val => dayjs.isDayjs(val), {
    message: required(),
  }),
]);

export const blockedTimeSchema = z.object({
  title: z.string({required_error: required()}),
  date: nullableDayjsSchema,
  startTime: nullableDayjsSchema,
  endTime: nullableDayjsSchema,
  masterId: z.string({required_error: required()}),
});

export type BlockedTimeSchema = z.infer<typeof blockedTimeSchema>;
