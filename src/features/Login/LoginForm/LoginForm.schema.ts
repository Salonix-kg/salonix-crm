import z from 'zod';

import {incorrectFormat, mustBeAtLeast, required} from '@utils/formHelpers.ts';

export const loginFormSchema = z.object({
  email: z
    .string({required_error: required('Логин')})
    .email({message: incorrectFormat}),
  password: z
    .string({required_error: required('Пароль')})
    .min(6, mustBeAtLeast('Пароль', 6)),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
