import dayjs, {Dayjs} from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import {dateFormat} from '@utils/date/dateFormatter.ts';

dayjs.extend(weekOfYear);

export type Week = {
  startDate: string;
  endDate: string;
};

export const getWeek = (date: Dayjs): Week => ({
  startDate: date.startOf('week').format(dateFormat),
  endDate: date.endOf('week').format(dateFormat),
});
