import {atom} from 'jotai/index';

import {servicesAtom} from '@atoms/calendar/services';

import {orderFormAtom} from './orderForm.atoms.ts';

export const addServiceToOrderFormAtom = atom(
  null,
  (get, set, serviceId: number) => {
    const services = get(servicesAtom);

    const service = services.find(service => service.id === serviceId)!;

    set(orderFormAtom, prev => ({
      ...prev,
      services: [...(prev.services || []), service],
    }));
  },
);
