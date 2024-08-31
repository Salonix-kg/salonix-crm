import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

export type UserRole = 'ADMIN' | 'MANAGER' | 'MASTER' | 'ACCOUNTANT';

export type User = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: null | string;
  role: UserRole;
};

export const userAtom = atomWithStorage<User | null>('user', null, undefined, {
  getOnInit: true,
});

export const isAuthAtom = atom(get => {
  const user = get(userAtom);

  return !!user?.email;
});
