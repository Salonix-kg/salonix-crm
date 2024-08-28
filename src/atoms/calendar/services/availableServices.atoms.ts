import {atom} from 'jotai';

import {orderFormAtom} from '@atoms/calendar/order';

import {sortServicesByCategory} from '@utils/sortServicesByCategory.ts';

import {servicesAtom} from './services.atoms.ts';

export const availableServicesAtom = atom(get => {
  const services = get(servicesAtom);
  const orderForm = get(orderFormAtom);

  const addedServicesId = orderForm.services?.map(service => service.id) || [];

  const data = services.filter(
    service =>
      service.mastersId.includes(orderForm.masterId!) &&
      !addedServicesId.includes(service.id),
  );

  return sortServicesByCategory(data);
});
