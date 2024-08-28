import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {EventContentArg} from '@fullcalendar/core';

import {Flex, Typography} from 'antd';

import {Order} from '@atoms/calendar/orders';

import {HoveredBlockData} from '@hooks/useCalendar.ts';
import {useResponsive} from '@hooks/useResponsive.ts';

import {getOrderStatus} from '@utils/calendar';

import styles from './OrderEvent.module.scss';

export type OrderEventProps = EventContentArg & {
  setHoveredBlockData: Dispatch<SetStateAction<HoveredBlockData | null>>;
};

export const OrderEvent = ({
  timeText,
  setHoveredBlockData,
  event,
}: OrderEventProps) => {
  const [order, setOrder] = useState<Order | null>(null);

  const {isMobile} = useResponsive();

  useEffect(() => {
    const order = event?._def?.extendedProps?.order;

    if (order) {
      setOrder(order as Order);
    }
  }, [event?._def?.extendedProps?.order]);

  const handleMouseOver = useCallback(() => {
    setHoveredBlockData(null);
  }, [setHoveredBlockData]);

  if (!order) {
    return null;
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      className={styles.eventContent}
      style={{backgroundColor: getOrderStatus(order?.status, 'color')}}>
      {!isMobile && (
        <Flex gap={4} align="start">
          <Typography.Text>{timeText}</Typography.Text>
          <Typography.Text className={styles.client}>
            {order?.client?.fullName}
          </Typography.Text>
        </Flex>
      )}
      <Typography.Text className={styles.serviceTitle}>
        {event.title}
      </Typography.Text>
    </div>
  );
};
