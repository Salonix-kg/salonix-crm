import {atom} from 'jotai';

import {Service, ServiceCategory} from '@atoms/calendar/services';

export type SortedServices = {
  category: ServiceCategory;
  services: Service[];
};

export const isOrderDrawerOpenAtom = atom(false);

export const isAddServiceDrawerOpenAtom = atom(false);

export const isAddClientDrawerOpenAtom = atom(false);
