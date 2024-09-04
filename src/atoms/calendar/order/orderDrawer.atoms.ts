import {atom} from 'jotai';

import {ServiceCategory} from '@atoms/calendar/services';

export type SortedServices<T> = {
  category: ServiceCategory;
  services: T[];
};

export const isOrderDrawerOpenAtom = atom(false);

export const isAddServiceDrawerOpenAtom = atom(false);

export const isAddClientDrawerOpenAtom = atom(false);
