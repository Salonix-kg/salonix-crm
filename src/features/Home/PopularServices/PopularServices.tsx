import {Card, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';

import {Table} from '@components/Table';

import {priceFormatter} from '@utils/priceFormatter.ts';

import {PopularServicesMenu} from './PopularServicesMenu';

import styles from '../Home.module.scss';

const columns: ColumnsType = [
  {
    title: 'Услуга',
    dataIndex: 'title',
  },
  {
    title: 'Количество продаж',
    dataIndex: 'amount',
    align: 'end',
  },
  {
    title: 'Сумма продаж',
    dataIndex: 'sum',
    align: 'end',
    render: sum => priceFormatter(sum),
  },
];

const services = [
  {
    id: 1,
    title: 'Стрижка',
    amount: 10,
    sum: 23000,
  },
  {
    id: 2,
    title: 'Цвет волос',
    amount: 7,
    sum: 12000,
  },
  {
    id: 3,
    title: 'Балаяж',
    amount: 4,
    sum: 12000,
  },
  {
    id: 4,
    title: 'Педикюр',
    amount: 3,
    sum: 6000,
  },
];

export const PopularServices = () => {
  return (
    <Card
      className={styles.card}
      title={
        <>
          <Typography.Title className={styles.title} level={5}>
            Популярные сервисы
          </Typography.Title>
          <Typography.Text className={styles.label} type="secondary">
            (На сегодня)
          </Typography.Text>
        </>
      }
      extra={<PopularServicesMenu />}>
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={services}
        pagination={false}
      />
    </Card>
  );
};
