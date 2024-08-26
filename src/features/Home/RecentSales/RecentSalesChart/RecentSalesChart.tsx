import dayjs from 'dayjs';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {Data} from '@features/Home/RecentSales';

import {
  dateFormatter,
  serverReturnedDateFormat,
} from '@utils/date/dateFormatter.ts';

const normalizer = (data: Data[]) => {
  return data.map(item => ({
    ...item,
    date: dateFormatter({
      date: item.date.format(serverReturnedDateFormat),
      format: 'dd DD',
    }),
  }));
};

const data: Data[] = [
  {
    date: dayjs().subtract(7, 'day'),
    amount: 3200,
  },
  {
    date: dayjs().subtract(6, 'day'),
    amount: 3500,
  },
  {
    date: dayjs().subtract(5, 'day'),
    amount: 2500,
  },
  {
    date: dayjs().subtract(5, 'day'),
    amount: 500,
  },
  {
    date: dayjs().subtract(4, 'day'),
    amount: 500,
  },
  {
    date: dayjs().subtract(3, 'day'),
    amount: 5020,
  },
  {
    date: dayjs().subtract(2, 'day'),
    amount: 4555,
  },
  {
    date: dayjs().subtract(1, 'day'),
    amount: 13000,
  },
  {
    date: dayjs(),
    amount: 10000,
  },
];

export const RecentSalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height="80%" style={{marginLeft: -20}}>
      <LineChart data={normalizer(data)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{r: 8}}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
