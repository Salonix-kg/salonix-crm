import {atom} from 'jotai/index';

import {orderFormAtom} from './orderForm.atoms.ts';

export const removeServiceInOrderFormAtom = atom(
  null,
  (_, set, serviceId: number) => {
    set(orderFormAtom, prev => ({
      ...prev,
      services: prev.services?.filter(service => service.id !== serviceId),
    }));
  },
);
