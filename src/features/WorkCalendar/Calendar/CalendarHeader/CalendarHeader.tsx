import {Dispatch, SetStateAction, useCallback} from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {Dayjs} from 'dayjs';
import {useAtomValue} from 'jotai';

import {Button, Col, DatePicker, Flex, Row} from 'antd';

import {Select} from '@components/Select';

import {mastersAtom} from '@atoms/calendar/masters';

import {IndicateButton} from './IndicateButton';

import styles from './CalendarHeader.module.scss';

export type CalendarHeaderProps = {
  date: Dayjs;
  setDate: Dispatch<SetStateAction<Dayjs>>;
};

export const CalendarHeader = ({date, setDate}: CalendarHeaderProps) => {
  const masters = useAtomValue(mastersAtom);

  const handlePrevClick = useCallback(() => {
    setDate(prev => prev.subtract(1, 'day'));
  }, [setDate]);

  const handleNextClick = useCallback(() => {
    setDate(prev => prev.add(1, 'day'));
  }, [setDate]);

  return (
    <Row justify="space-between">
      <Col md={3}>
        <Select
          containerClassName={styles.select}
          withoutPadding
          placeholder="Выберите мастера"
          value="Все"
          options={masters?.map(master => ({
            label: master.title,
            value: master.id,
          }))}
        />
      </Col>
      <Col>
        <Flex gap={4}>
          <Button onClick={handlePrevClick}>
            <FaChevronLeft size={14} />
          </Button>
          <DatePicker
            width={300}
            allowClear={false}
            suffixIcon={false}
            value={date}
            onChange={setDate}
            format="dddd, DD MMM"
          />
          <Button onClick={handleNextClick}>
            <FaChevronRight size={14} />
          </Button>
        </Flex>
      </Col>
      <Col md={3}>
        <IndicateButton />
      </Col>
    </Row>
  );
};
