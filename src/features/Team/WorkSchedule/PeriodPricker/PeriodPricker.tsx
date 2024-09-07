import {useEffect, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import {DatePicker} from 'antd';

import {getWeek} from '@utils/date';

dayjs.extend(weekOfYear);

export type SelectedWeek = {
  startDate: string;
  endDate: string;
};

const customWeekFormat = (date: Dayjs | null): string => {
  if (!date) return '';
  const startOfWeek = dayjs(date).startOf('week').format('D MMM');
  const endOfWeek = dayjs(date).endOf('week').format('D MMM');
  return `${startOfWeek} - ${endOfWeek}`;
};

export const PeriodPricker = () => {
  const [selectedWeek, setSelectedWeek] = useState<SelectedWeek>(
    getWeek(dayjs()),
  );

  useEffect(() => {}, [selectedWeek]);

  const handleWeekChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedWeek(getWeek(date));
    }
  };

  return (
    <DatePicker.WeekPicker
      allowClear={false}
      value={dayjs()}
      onChange={handleWeekChange}
      format={customWeekFormat}
    />
  );
};
