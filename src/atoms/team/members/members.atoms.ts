import {atom} from 'jotai';

import {membersMock} from './members.mock.ts';

export type Member = {
  id: number;
  avatar?: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  birthDate?: string | null;
  position: string;
  commission: number;
  experience: number;
  servicesId: number[];
};

export const membersAtom = atom<Member[]>(membersMock);
