import {atom} from 'jotai';

import {LoginFormSchema} from '@features/Login/LoginForm';

import {userAtom} from './user.atoms.ts';
import {users} from './users.mock.ts';

export const isAuthingAtom = atom(false);

export const loginAtom = atom(null, (_, set, data: LoginFormSchema) => {
  const user = users.find(item => item.email === data.email);

  if (user) {
    void set(userAtom, user);
  }
});
