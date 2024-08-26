import {atom} from 'jotai';

export type OrderStatus = 'booked' | 'pending' | 'completed';

export type OrderData = {
  status: OrderStatus;
  client: OrderClient;
};

export type Order = {
  resourceId: string;
  title: string;
  start: string;
  end: string;
  order: OrderData;
};

export type OrderClient = {
  id: number;
  fullName: string;
};

export const ordersAtom = atom<Order[]>([
  {
    resourceId: '1',
    title: 'Укладка волос феном',
    start: '2024-08-26T13:00:00',
    end: '2024-08-26T13:30:00',
    order: {
      status: 'booked',
      client: {
        id: 1,
        fullName: 'Асанов Усон',
      },
    },
  },
  {
    resourceId: '2',
    title: 'Укладка волос феном',
    start: '2024-08-26T11:00:00',
    end: '2024-08-26T11:30:00',
    order: {
      status: 'pending',
      client: {
        id: 1,
        fullName: 'Асанов Усон',
      },
    },
  },
  {
    resourceId: '3',
    title: 'Укладка волос феном',
    start: '2024-08-26T12:00:00',
    end: '2024-08-26T13:30:00',
    order: {
      status: 'completed',
      client: {
        id: 1,
        fullName: 'Асанов Усон',
      },
    },
  },
]);
