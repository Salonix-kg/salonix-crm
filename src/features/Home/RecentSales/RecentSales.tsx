import {Dayjs} from 'dayjs';

import {Card, Typography} from 'antd';

import {priceFormatter} from '@utils/priceFormatter.ts';

import {RecentSalesChart} from './RecentSalesChart';
import {RecentSalesMenu} from './RecentSalesMenu';

import styles from '../Home.module.scss';

export type Data = {
  date: Dayjs;
  amount: number;
};

export const RecentSales = () => {
  return (
    <Card
      className={styles.card}
      title="Последние визиты (6)"
      extra={<RecentSalesMenu />}>
      <Typography.Text type="secondary">Последние 7 дней</Typography.Text>
      <Typography.Title level={4} className={styles.recentSalesTitle}>
        {priceFormatter(32000)}
      </Typography.Title>
      <RecentSalesChart />
    </Card>
  );
};
