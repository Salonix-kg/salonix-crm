import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

import {WeekDay} from '@atoms/team/workSchedule';

import {dateFormat} from '@utils/date/dateFormatter.ts';

dayjs.extend(weekday);

const dayOfWeekMap: Record<WeekDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export const getDateForDayOfWeek = (
  startDate: string,
  endDate: string,
  dayOfWeek: WeekDay,
): string | null => {
  const start = dayjs(startDate, dateFormat);
  const end = dayjs(endDate, dateFormat);

  const dayIndex = dayOfWeekMap[dayOfWeek];

  let date = start.day(dayIndex);

  if (date.isBefore(start)) {
    date = date.add(1, 'week');
  }

  if (date.isAfter(end)) {
    return null;
  }

  return date.format('ddd, DD MMM');
};
