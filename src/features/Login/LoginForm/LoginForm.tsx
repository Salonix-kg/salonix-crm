import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtomValue, useSetAtom} from 'jotai';

import {Flex, Typography} from 'antd';

import {
  LoginFormSchema,
  loginFormSchema,
} from '@features/Login/LoginForm/LoginForm.schema.ts';

import {Button} from '@components/Button';
import {TextInput} from '@components/TextInput';

import {isAuthingAtom, loginAtom} from '@atoms/auth';

import {theme} from '@styles/theme.ts';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const isAuthing = useAtomValue(isAuthingAtom);
  const login = useSetAtom(loginAtom);

  const {control, handleSubmit} = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <Flex vertical className={styles.container} align="center">
      <Flex className={styles.form} vertical gap={4} justify="space-evenly">
        <Typography.Title className={styles.text} level={3}>
          Salonix для профессионалов
        </Typography.Title>
        <Typography.Text className={styles.label}>
          Войдите в систему с логином, который вам был выдан для управления
          бизнесом
        </Typography.Text>
        <Controller
          name="email"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextInput
              disabled={isAuthing}
              size="large"
              placeholder="Введите логин"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextInput
              disabled={isAuthing}
              size="large"
              placeholder="Введите пароль"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Button
          loading={isAuthing}
          className={styles.button}
          onClick={handleSubmit(login)}
          size="large"
          type="primary"
          block
          bg={theme.black}>
          Войти
        </Button>
      </Flex>
    </Flex>
  );
};
