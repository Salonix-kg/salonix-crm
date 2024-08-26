import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {EventContentArg} from '@fullcalendar/core';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {useSetAtom} from 'jotai';

import {Flex, Typography} from 'antd';

import {
  BlockedTime,
  blockedTimeFormAtom,
  isBlockedTimeDrawerOpenAtom,
} from '@atoms/calendar/blockedTime';
import {OrderData} from '@atoms/calendar/orders';

import {HoveredBlockData} from '@hooks/useCalendar.ts';
import {useResponsive} from '@hooks/useResponsive.ts';

import {getOrderStatus} from '@utils/calendar';
import {calendarFormat} from '@utils/date';

import styles from './EventContent.module.scss';

export type EventContentProps = EventContentArg & {
  setHoveredBlockData: Dispatch<SetStateAction<HoveredBlockData | null>>;
};

export const EventContent = ({
  timeText,
  setHoveredBlockData,
  event,
}: EventContentProps) => {
  const setBlockedTimeForm = useSetAtom(blockedTimeFormAtom);
  const setIsBlockedTimeDrawerOpen = useSetAtom(isBlockedTimeDrawerOpenAtom);

  const [blockedTimeData, setBlockedTimeData] = useState<BlockedTime | null>(
    null,
  );
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const {isMobile} = useResponsive();

  const handleMouseOver = useCallback(() => {
    setHoveredBlockData(null);
  }, [setHoveredBlockData]);

  useEffect(() => {
    const blockedTime = event?._def?.extendedProps?.bookedTime;
    const order = event?._def?.extendedProps?.order;

    if (blockedTime) {
      setBlockedTimeData(blockedTime as BlockedTime);
      return;
    }

    if (order) {
      setOrderData(order as OrderData);
    }
  }, [
    event?._def?.extendedProps?.bookedTime,
    event?._def?.extendedProps?.order,
  ]);

  const handleBlockTimeClick = useCallback(() => {
    if (!blockedTimeData) {
      return;
    }

    const data = {
      id: blockedTimeData.id,
      title: blockedTimeData.title,
      startTime: dayjs(
        `${blockedTimeData?.date} ${blockedTimeData?.startTime}`,
        calendarFormat + 'HH:mm',
      ),
      endTime: dayjs(
        `${blockedTimeData.date} ${blockedTimeData.endTime}`,
        calendarFormat + 'HH:mm',
      ),
      date: dayjs(blockedTimeData.date),
      masterId: blockedTimeData.masterId.toString(),
    };

    setBlockedTimeForm(data);

    setIsBlockedTimeDrawerOpen(true);
  }, [blockedTimeData, setBlockedTimeForm, setIsBlockedTimeDrawerOpen]);

  if (blockedTimeData) {
    return (
      <div
        onClick={handleBlockTimeClick}
        onMouseOver={handleMouseOver}
        className={classNames(styles.eventContent, styles.blocked)}>
        <Flex gap={4} align="start">
          <Typography.Text>{timeText}</Typography.Text>
        </Flex>
        <Typography.Text className={styles.serviceTitle}>
          {event.title}
        </Typography.Text>
      </div>
    );
  }

  if (orderData) {
    return (
      <div
        onMouseOver={handleMouseOver}
        className={styles.eventContent}
        style={{backgroundColor: getOrderStatus(orderData?.status, 'color')}}>
        {!isMobile && (
          <Flex gap={4} align="start">
            <Typography.Text>{timeText}</Typography.Text>
            <Typography.Text className={styles.client}>
              {orderData?.client?.fullName}
            </Typography.Text>
          </Flex>
        )}
        <Typography.Text className={styles.serviceTitle}>
          {event.title}
        </Typography.Text>
      </div>
    );
  }
};
