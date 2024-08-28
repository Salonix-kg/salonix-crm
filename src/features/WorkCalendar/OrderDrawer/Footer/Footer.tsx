import {useCallback} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';

import {Flex, Typography} from 'antd';

import {Button} from '@components/Button';

import {
  createOrderAtom,
  isCanCreateOrderAtom,
  isOrderDrawerOpenAtom,
  OrderForm,
  orderFormAtom,
  orderTotalAtom,
} from '@atoms/calendar/order';

import {durationFormatter} from '@utils/date';
import {priceFormatter} from '@utils/priceFormatter.ts';

import {theme} from '@styles/theme.ts';

import styles from './Footer.module.scss';

export const Footer = () => {
  const setIsOrderDrawerOpen = useSetAtom(isOrderDrawerOpenAtom);
  const isCanCreateOrder = useAtomValue(isCanCreateOrderAtom);
  const total = useAtomValue(orderTotalAtom);
  const orderForm = useAtomValue(orderFormAtom);
  const createOrder = useSetAtom(createOrderAtom);

  const handleBook = useCallback(() => {
    createOrder(orderForm as OrderForm);
    setIsOrderDrawerOpen(false);
  }, [createOrder, orderForm, setIsOrderDrawerOpen]);

  return (
    <Flex vertical gap={12}>
      {total && (
        <Flex justify="space-between">
          <Typography.Text className={styles.total}>Итого:</Typography.Text>{' '}
          <Flex gap={8}>
            <Typography.Text className={styles.duration}>
              {durationFormatter(total.duration)}
            </Typography.Text>
            <Typography.Text className={styles.price}>
              {priceFormatter(total.price)}
            </Typography.Text>
          </Flex>
        </Flex>
      )}
      <Button
        disabled={!isCanCreateOrder}
        size="large"
        type="primary"
        onClick={handleBook}
        bg={isCanCreateOrder ? theme.black : undefined}>
        Забронировать
      </Button>
    </Flex>
  );
};
