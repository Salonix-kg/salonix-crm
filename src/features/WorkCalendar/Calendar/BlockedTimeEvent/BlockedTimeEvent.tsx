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
import {useSetAtom} from 'jotai/index';

import {Flex, Typography} from 'antd';

import {
  BlockedTime,
  blockedTimeFormAtom,
  isBlockedTimeDrawerOpenAtom,
} from '@atoms/calendar/blockedTime';

import {HoveredBlockData} from '@hooks/useCalendar.ts';

import {calendarFormat} from '@utils/date';

import styles from '../OrderEvent/OrderEvent.module.scss';

export type EventContentProps = EventContentArg & {
  setHoveredBlockData: Dispatch<SetStateAction<HoveredBlockData | null>>;
};

export const BlockedTimeEvent = ({
  setHoveredBlockData,
  event,
  timeText,
}: EventContentProps) => {
  const [blockedTimeData, setBlockedTimeData] = useState<BlockedTime | null>(
    null,
  );

  const setBlockedTimeForm = useSetAtom(blockedTimeFormAtom);
  const setIsBlockedTimeDrawerOpen = useSetAtom(isBlockedTimeDrawerOpenAtom);

  useEffect(() => {
    const blockedTime = event?._def?.extendedProps?.bookedTime;

    if (blockedTime) {
      setBlockedTimeData(blockedTime as BlockedTime);
    }
  }, [event?._def?.extendedProps?.bookedTime]);

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

  const handleMouseOver = useCallback(() => {
    setHoveredBlockData(null);
  }, [setHoveredBlockData]);

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
};
