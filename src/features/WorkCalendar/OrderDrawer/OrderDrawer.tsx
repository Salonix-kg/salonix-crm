import {useCallback, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Dayjs} from 'dayjs';
import {useAtom} from 'jotai';
import {useAtomValue} from 'jotai/index';

import {Col, DatePicker, Drawer, Flex, Row, TimePicker} from 'antd';

import {AddServiceDrawer} from '@features/WorkCalendar/OrderDrawer/AddServiceDrawer';
import {
  OrderSchema,
  orderSchema,
} from '@features/WorkCalendar/OrderDrawer/Order.schema.ts';

import {DatePickerContainer} from '@components/DatePickerContainer';
import {Select} from '@components/Select';

import {mastersAsOptionsAtom} from '@atoms/calendar/masters';
import {isOrderDrawerOpenAtom, orderFormAtom} from '@atoms/calendar/order';

import {dateFormat} from '@utils/date';
import {required} from '@utils/formHelpers.ts';

import {theme} from '@styles/theme.ts';

import {AddClientDrawer} from './AddClientDrawer';
import {Client} from './Client';
import {Footer} from './Footer';
import {Services} from './Services';

export const OrderDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isOrderDrawerOpenAtom);
  const [orderForm, setOrderForm] = useAtom(orderFormAtom);
  const mastersAsOptions = useAtomValue(mastersAsOptionsAtom);

  const {control, watch, reset} = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (orderForm && isOpen) {
      reset(orderForm);
    }
  }, [isOpen]);

  useEffect(() => {
    const subscription = watch(value => {
      const {masterId, date, startTime} = value;

      setOrderForm(prev => ({
        ...prev,
        masterId,
        date: date as Dayjs,
        startTime: startTime as Dayjs,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setOrderForm, watch]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Drawer
      width={520}
      styles={{header: {backgroundColor: theme.blue}}}
      onClose={handleClose}
      open={isOpen}
      footer={<Footer />}>
      <Row gutter={12}>
        <Col xs={16}>
          <Controller
            control={control}
            name="date"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <DatePickerContainer
                error={error?.message && required()}
                label="Дата">
                <DatePicker
                  value={value || undefined}
                  onChange={onChange}
                  format={dateFormat}
                  size="large"
                />
              </DatePickerContainer>
            )}
          />
        </Col>
        <Col xs={8}>
          <Controller
            control={control}
            name="startTime"
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <DatePickerContainer
                label="Время начала"
                error={error?.message && required()}>
                <TimePicker
                  value={value || undefined}
                  onChange={onChange}
                  onBlur={onBlur}
                  minuteStep={10}
                  showSecond={false}
                  showNow={false}
                  suffixIcon={false}
                  allowClear={false}
                  placeholder="00:00"
                  size="large"
                />
              </DatePickerContainer>
            )}
          />
        </Col>
      </Row>
      <Controller
        control={control}
        name="masterId"
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Select
            label="Член команды"
            placeholder="Выберите члена команды"
            value={value}
            onChange={onChange}
            options={mastersAsOptions}
            size="large"
            error={error?.message}
          />
        )}
      />
      <Flex gap={20} vertical>
        <Client />
        <Services />
      </Flex>
      <AddServiceDrawer />
      <AddClientDrawer />
    </Drawer>
  );
};
