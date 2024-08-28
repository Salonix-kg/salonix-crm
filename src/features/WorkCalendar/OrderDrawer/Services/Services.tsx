import {useCallback, useMemo} from 'react';
import {IoMdAdd} from 'react-icons/io';
import classNames from 'classnames';
import {useAtom, useSetAtom} from 'jotai';

import {Typography} from 'antd';

import {Button} from '@components/Button';
import {ServiceCard, ServiceCardData} from '@components/ServiceCard';

import {
  isAddServiceDrawerOpenAtom,
  orderFormAtom,
  removeServiceInOrderFormAtom,
} from '@atoms/calendar/order';

import styles from './Services.module.scss';

export const Services = () => {
  const setIsAddServiceDrawerOpen = useSetAtom(isAddServiceDrawerOpenAtom);
  const [orderForm] = useAtom(orderFormAtom);
  const removeServiceInOrderForm = useSetAtom(removeServiceInOrderFormAtom);

  const handleAddService = useCallback(() => {
    setIsAddServiceDrawerOpen(true);
  }, [setIsAddServiceDrawerOpen]);

  const handleRemove = useCallback(
    ({id}: ServiceCardData) => {
      removeServiceInOrderForm(id);
    },
    [removeServiceInOrderForm],
  );

  const isServicesAdded = useMemo(
    () => !!orderForm.services?.length,
    [orderForm],
  );

  return (
    <div>
      <Typography.Title level={5}>Услуги</Typography.Title>
      {orderForm?.services?.map(service => (
        <ServiceCard key={service.id} onRemove={handleRemove} data={service} />
      ))}
      <Button
        className={classNames({
          [styles.addButton]: isServicesAdded,
        })}
        onClick={handleAddService}
        size={isServicesAdded ? 'small' : 'large'}
        type="dashed"
        block={!isServicesAdded}
        icon={<IoMdAdd />}>
        Добавить услуги
      </Button>
    </div>
  );
};
