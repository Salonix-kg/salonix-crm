import {atom} from 'jotai';

import {OrderSchema} from '@features/WorkCalendar/OrderDrawer';

import {Client} from '@atoms/calendar/clients';
import {Service} from '@atoms/calendar/services';

export type OrderForm = OrderSchema & {
  id?: number;
  services: Service[];
  client: Client | null;
};

export const orderFormAtom = atom<Partial<OrderForm>>({});

export const isCanCreateOrderAtom = atom(get => {
  const {date, startTime, services, masterId} = get(orderFormAtom);

  return date && startTime && services?.length && masterId;
});

export const orderTotalAtom = atom(get => {
  const {services} = get(orderFormAtom);

  const total = services?.reduce(
    (acc, curr) => {
      return {
        duration: (acc.duration += curr.duration),
        price: (acc.price += curr.price),
      };
    },
    {duration: 0, price: 0},
  );

  return total;
});
