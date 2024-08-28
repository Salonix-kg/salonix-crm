import {atom} from 'jotai';

import {ordersMock} from '@atoms/calendar/orders/orders.mock.ts';

export type OrderStatus = 'booked' | 'pending' | 'completed';

export type ServiceCategory = {
  id: number;
  title: string;
};

export type OrderService = {
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

export type OrderMaster = {
  id: number;
  fullName: string;
};

export type OrderClient = {
  id: number;
  fullName: string;
  phoneNumber: string;
};

export type Order = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: OrderStatus;
  services: OrderService[];
  master: OrderMaster;
  client: OrderClient | null;
};

export const ordersAtom = atom<Order[]>([...ordersMock]);
