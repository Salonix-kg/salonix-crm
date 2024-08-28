import {atom} from 'jotai';

import {mastersAtom} from '@atoms/calendar/masters';
import {OrderForm} from '@atoms/calendar/order/orderForm.atoms.ts';
import {Order, ordersAtom} from '@atoms/calendar/orders';

import {calendarFormat, dateFormatter} from '@utils/date';

export const createOrderAtom = atom(null, (get, set, data: OrderForm) => {
  const {id, client, services, date, startTime, masterId} = data;
  const masters = get(mastersAtom);

  const master = masters.find(master => master.id === masterId);
  const duration = services.reduce((acc, curr) => acc + curr.duration, 0);

  const orderData: Order = {
    id: id || Math.floor(Math.random() * 1000) + 1,
    client,
    services,
    date: dateFormatter({date: date!, format: calendarFormat}),
    startTime: dateFormatter({date: startTime!, format: 'HH:mm'}),
    endTime: dateFormatter({
      date: startTime!.add(duration, 'minutes'),
      format: 'HH:mm',
    }),
    master: master!,
    status: 'booked',
  };

  set(ordersAtom, prev => [...prev, orderData]);
});
