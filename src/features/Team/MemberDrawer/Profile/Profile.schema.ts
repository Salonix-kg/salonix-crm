import parsePhoneNumberFromString from 'libphonenumber-js';
import z from 'zod';

import {nullableDayjsSchema} from '@utils/date';
import {incorrectFormat, required} from '@utils/formHelpers.ts';

const phoneNumberScheme = z.string({required_error: required()}).refine(
  value => {
    const phoneNumber = parsePhoneNumberFromString(value, 'KG');
    return phoneNumber?.isValid() ?? false;
  },
  {
    message: 'Введите корректный номер телефона',
  },
);

export const profileSchema = z.object({
  avatar: z
    .union([z.instanceof(File).optional(), z.string().optional()])
    .nullable(),
  fullName: z.string({required_error: required()}),
  phoneNumber: phoneNumberScheme,
  email: z
    .string({required_error: required()})
    .email({message: incorrectFormat}),
  birthDate: nullableDayjsSchema,
  position: z.string({required_error: required()}),
  commission: z
    .number({required_error: required()})
    .min(0, 'Комиссия должна быть положительным числом')
    .max(100, 'Комиссия не может превышать 100%'),
  experience: z
    .number({required_error: required()})
    .min(0, 'Опыт работы должен быть положительным числом'),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
