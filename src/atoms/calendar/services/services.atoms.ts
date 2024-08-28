import {atom} from 'jotai';

import {servicesMock} from './services.mock.ts';

export type ServiceCategory = {
  id: number;
  title: string;
};

export type Service = {
  id: number;
  title: string;
  /**
   * @type duration
   * @description в минутах
   */
  duration: number;
  price: number;
  category: ServiceCategory;
  mastersId: number[];
};

export const servicesAtom = atom<Service[]>(servicesMock);
