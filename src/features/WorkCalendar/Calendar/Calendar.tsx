import {useCallback, useMemo, useState} from 'react';
import ruLocale from '@fullcalendar/core/locales/ru';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayjs, {Dayjs} from 'dayjs';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Card, Flex} from 'antd';

import {
  blockedTimeFormAtom,
  blockedTimesAtom,
  isBlockedTimeDrawerOpenAtom,
} from '@atoms/calendar/blockedTime';
import {mastersAtom} from '@atoms/calendar/masters';
import {ordersAtom} from '@atoms/calendar/orders';

import {useCalendar} from '@hooks/useCalendar.ts';

import {blockedTimeToEvent} from '@utils/calendar/blockedTimeToEvent.ts';

import {CalendarHeader} from './CalendarHeader';
import {EventContent} from './EventContent';
import {HoveredBlock} from './HoveredBlock';

import styles from './Calendar.module.scss';

export const Calendar = () => {
  const [isBlockedTimeOpen, setIsBlockedTimeOpen] = useAtom(
    isBlockedTimeDrawerOpenAtom,
  );
  const masters = useAtomValue(mastersAtom);
  const blockedTime = useAtomValue(blockedTimesAtom);
  const orders = useAtomValue(ordersAtom);

  const setBlockedTimeForm = useSetAtom(blockedTimeFormAtom);

  const [date, setDate] = useState(dayjs());
  const [indicatingDate, setIndicatingDate] = useState<Dayjs | null>(null);
  const [indicatingMasterId, setIndicatingMasterId] = useState<string | null>(
    null,
  );
  const [isIndicateDropdownOpen, setIsIndicateDropdownOpen] = useState(false);

  const {hoveredBlockData, setHoveredBlockData} = useCalendar(
    isIndicateDropdownOpen || isBlockedTimeOpen,
  );

  const handleDateClick = useCallback(
    (data: DateClickArg) => {
      if (data.resource?._resource?.id) {
        setIndicatingMasterId(
          isIndicateDropdownOpen ? null : data.resource?._resource?.id,
        );
      }

      setIndicatingDate(isIndicateDropdownOpen ? null : dayjs(data.date));
      setIsIndicateDropdownOpen(prev => !prev);
    },
    [isIndicateDropdownOpen],
  );

  const handleAddBlockedTimeClick = useCallback(() => {
    setIsIndicateDropdownOpen(false);
    setBlockedTimeForm({
      startTime: indicatingDate,
      masterId: indicatingMasterId!,
    });
    setIsBlockedTimeOpen(true);
  }, [
    indicatingDate,
    indicatingMasterId,
    setBlockedTimeForm,
    setIsBlockedTimeOpen,
  ]);

  const handleAddNewVisitClick = useCallback(() => {}, []);

  const events = useMemo(
    () => [...orders, ...blockedTimeToEvent(blockedTime)],
    [orders, blockedTime],
  );

  return (
    <Flex vertical gap={12}>
      <CalendarHeader date={date} setDate={setDate} />
      <Card size="small" classNames={{body: styles.container}}>
        <FullCalendar
          locale={ruLocale}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          initialDate={date.format('YYYY-MM-DD')}
          initialView="resourceTimeGridDay"
          resources={masters}
          allDaySlot={false}
          slotDuration="00:10:00"
          slotLabelInterval="00:30:00"
          slotLabelFormat={{timeStyle: 'short'}}
          nowIndicator={date.isSame(dayjs(), 'day')}
          headerToolbar={false}
          eventContent={props => (
            <EventContent
              {...props}
              setHoveredBlockData={setHoveredBlockData}
            />
          )}
          events={events}
          dateClick={handleDateClick}
          height="100%"
        />
        {hoveredBlockData && (
          <HoveredBlock
            hoveredBlockData={hoveredBlockData}
            onAddBlockedTime={handleAddBlockedTimeClick}
            onAddNewVisit={handleAddNewVisitClick}
            isIndicateDropdownOpen={isIndicateDropdownOpen}
            setIsIndicateDropdownOpen={setIsIndicateDropdownOpen}
          />
        )}
      </Card>
    </Flex>
  );
};
