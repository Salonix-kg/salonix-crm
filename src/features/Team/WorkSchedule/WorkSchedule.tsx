import {useMemo} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {useAtomValue} from 'jotai';

import {Avatar, Flex, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {ColumnType} from 'antd/es/table/interface';

import {Table} from '@components/Table';

import {MasterSchedule, workScheduleAtom} from '@atoms/team/workSchedule';

import {daysOfWeek, getDateForDayOfWeek, getWeek} from '@utils/date';

import {AddShiftCard} from './AddShiftCard';
import {PeriodPricker} from './PeriodPricker';
import {RegularShiftModal} from './RegularShiftModal';
import {ShiftCard} from './ShiftCard';
import {ShiftModal} from './ShiftModal';

import styles from './WorkSchedule.module.scss';

const daysColumns = (date: Dayjs) =>
  daysOfWeek.map((day): ColumnType<MasterSchedule> => {
    const {startDate, endDate} = getWeek(date);

    return {
      dataIndex: day,
      title: getDateForDayOfWeek(startDate, endDate, day),
      key: day,
      align: 'center',
      render: (_, record) => {
        return record.week[day] ? (
          <ShiftCard workDay={record.week[day]} />
        ) : (
          <AddShiftCard />
        );
      },
    };
  });

export const WorkSchedule = () => {
  const mastersSchedule = useAtomValue(workScheduleAtom);

  const columns: ColumnsType<MasterSchedule> = useMemo(
    () => [
      {
        title: 'Мастер',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (fullName: string, record) => (
          <Flex className={styles.master} gap={8} align="center">
            <Avatar src={record.avatar} size={40} />
            <Flex vertical>
              <Typography.Text>{fullName}</Typography.Text>
              <Typography.Text className={styles.hours}>70h</Typography.Text>
            </Flex>
          </Flex>
        ),
      },
      ...daysColumns(dayjs()),
    ],
    [],
  );

  return (
    <>
      <Flex className={styles.header} justify="space-between" align="center">
        <Typography.Title className={styles.title} level={5}>
          График работы
        </Typography.Title>
        <PeriodPricker />
      </Flex>
      <Table
        rowKey={record => record.masterId}
        columns={columns}
        bordered
        scroll={{x: 'max-content'}}
        dataSource={mastersSchedule}
        className={styles.table}
        rowClassName={styles.row}
        pagination={false}
      />
      <ShiftModal />
      <RegularShiftModal />
    </>
  );
};
