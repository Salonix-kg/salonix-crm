import {
  ChangeEventHandler,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {BiSearch} from 'react-icons/bi';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Drawer, Empty, Flex, Typography} from 'antd';

import {ServiceCard, ServiceCardData} from '@components/ServiceCard';
import {TextInput} from '@components/TextInput';

import {
  addServiceToOrderFormAtom,
  isAddServiceDrawerOpenAtom,
} from '@atoms/calendar/order';
import {availableServicesAtom} from '@atoms/calendar/services';

import styles from './AddServiceDrawer.module.scss';

export const AddServiceDrawer = () => {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useAtom(isAddServiceDrawerOpenAtom);
  const servicesList = useAtomValue(availableServicesAtom);
  const addServiceToOrderForm = useSetAtom(addServiceToOrderFormAtom);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      setSearchText(e.target.value);
    }, []);

  const handleServiceClick = useCallback(
    ({id}: ServiceCardData) => {
      addServiceToOrderForm(id);
      setIsOpen(false);
    },
    [addServiceToOrderForm, setIsOpen],
  );

  const filteredServicesList = useMemo(() => {
    const data = servicesList.filter(
      ({services}) =>
        services.filter(service =>
          service.title.toLowerCase().includes(searchText.toLowerCase()),
        ).length,
    );

    return data.filter(({services}) => services.length > 0);
  }, [searchText, servicesList]);

  return (
    <Drawer
      title="Добавить услуги"
      width={520}
      onClose={handleClose}
      open={isOpen}>
      {filteredServicesList.length ? (
        <>
          <TextInput
            value={searchText}
            onChange={handleSearchTextChange}
            size="large"
            prefix={<BiSearch />}
            placeholder="Поиск по названию услуги"
          />
          {filteredServicesList.map(({category, services}) => (
            <Fragment key={category.id}>
              <Typography.Title className={styles.category} level={5}>
                {category.title}
              </Typography.Title>
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  data={service}
                  onClick={handleServiceClick}
                />
              ))}
            </Fragment>
          ))}
        </>
      ) : (
        <Flex style={{height: `100%`}} justify="center" align="center">
          <Empty description="Нет доступных услуг" />
        </Flex>
      )}
    </Drawer>
  );
};
