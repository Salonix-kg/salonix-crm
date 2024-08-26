import {OrderStatus} from '@atoms/calendar/orders';

export const orderStatuses: Record<OrderStatus, string> = {
  pending: 'В ожидании',
  booked: 'Забронирован',
  completed: 'Завершен',
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: 'rgba(247,171,171,0.5)',
  booked: 'rgba(222,157,28,0.5)',
  completed: 'rgba(94,173,111,0.41)',
};

export const getOrderStatus = (
  status: OrderStatus,
  type: 'label' | 'color' = 'label',
) => {
  return type === 'label' ? orderStatuses[status] : orderStatusColors[status];
};
