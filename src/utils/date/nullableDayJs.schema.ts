import dayjs, {Dayjs} from 'dayjs';
import z from 'zod';

import {required} from '@utils/formHelpers.ts';

export const nullableDayjsSchema = z.union([
  z.null(),
  z.custom<Dayjs>(val => dayjs.isDayjs(val), {
    message: required(),
  }),
]);
