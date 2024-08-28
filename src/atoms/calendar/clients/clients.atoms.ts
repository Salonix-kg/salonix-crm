import {atom} from 'jotai';

import {clients} from './clients.mock.ts';

export type Client = {
  id: number;
  fullName: string;
  phoneNumber: string;
};

export const clientsAtom = atom<Client[]>(clients);
