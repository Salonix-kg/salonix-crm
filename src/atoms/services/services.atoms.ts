import {atom} from 'jotai';

import {servicesMock} from '@atoms/calendar/services/services.mock.ts';

import {sortServicesByCategory} from '@utils/sortServicesByCategory.ts';

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
};

export const servicesAtom = atom(servicesMock);

export const categoryServicesAtom = atom(get => {
  return sortServicesByCategory(get(servicesAtom));
});
