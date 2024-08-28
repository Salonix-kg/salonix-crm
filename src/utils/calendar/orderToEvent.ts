import {Order} from '@atoms/calendar/orders';

export type OrderEvent = {
  resourceId: string;
  title: string;
  start: string;
  end: string;
  order: Order;
};

export const orderToEvent = (orders: Order[]): OrderEvent[] => {
  const data = orders.map((order): OrderEvent => {
    const {master, startTime, endTime, date, services} = order;

    const title = services.map(service => service.title).join(', ');

    return {
      resourceId: master.id.toString(),
      start: `${date} ${startTime}`,
      end: `${date} ${endTime}`,
      title,
      order,
    };
  });

  return data;
};
