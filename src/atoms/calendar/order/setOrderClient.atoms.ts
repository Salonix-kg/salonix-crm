import {atom} from 'jotai';

import {Client} from '@atoms/calendar/clients';
import {orderFormAtom} from '@atoms/calendar/order/orderForm.atoms.ts';

export const setOrderClientAtom = atom(
  null,
  (_, set, client: Client | null) => {
    set(orderFormAtom, prev => ({...prev, client}));
  },
);
