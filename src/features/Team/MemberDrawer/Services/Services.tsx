import {useCallback} from 'react';
import {useAtomValue, useSetAtom} from 'jotai';

import {Checkbox, Flex, Typography} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

import {ServiceCard} from '@components/ServiceCard';

import {categoryServicesAtom, Service} from '@atoms/services';
import {
  changeMemberCategoryHandlerAtom,
  changeMemberServiceHandlerAtom,
  memberServicesAtom,
  memberServicesIdAtom,
} from '@atoms/team/member';

import styles from './Services.module.scss';

const isIndeterminate = (
  categoryId: number,
  categoryServices: Service[],
  memberServices: Service[],
) => {
  const services = memberServices.filter(
    service => service.category.id === categoryId,
  );

  return services.length > 0 && services.length < categoryServices.length;
};

const isChecked = (
  categoryId: number,
  categoryServices: Service[],
  memberServices: Service[],
) => {
  const services = memberServices.filter(
    service => service.category.id === categoryId,
  );

  return services.length === categoryServices.length;
};

export const Services = () => {
  const services = useAtomValue(categoryServicesAtom);
  const memberServices = useAtomValue(memberServicesAtom);
  const memberServicesId = useAtomValue(memberServicesIdAtom);

  const changeServiceHandler = useSetAtom(changeMemberServiceHandlerAtom);
  const changeCategoryHandler = useSetAtom(changeMemberCategoryHandlerAtom);

  const handleServiceChange = useCallback(
    (service: Service) => () => {
      changeServiceHandler(service);
    },
    [changeServiceHandler],
  );

  const handleCategoryChange = useCallback(
    (categoryId: number) => (e: CheckboxChangeEvent) => {
      changeCategoryHandler({categoryId, checked: e.target.checked});
    },
    [changeCategoryHandler],
  );

  return (
    <div className={styles.container}>
      {services.map(({category, services: categoryServices}) => (
        <div className={styles.block} key={category.id}>
          <Flex className={styles.header} gap={12} align="center">
            <Checkbox
              indeterminate={isIndeterminate(
                category.id,
                categoryServices,
                memberServices,
              )}
              checked={isChecked(category.id, categoryServices, memberServices)}
              onChange={handleCategoryChange(category.id)}
            />
            <Typography.Title className={styles.category} level={5}>
              {category.title}
            </Typography.Title>
          </Flex>
          <Flex className={styles.list} vertical gap={12}>
            {categoryServices.map(service => (
              <ServiceCard
                prefix={
                  <Checkbox
                    onChange={handleServiceChange(service)}
                    checked={memberServicesId.includes(service.id)}
                  />
                }
                className={styles.card}
                animation={false}
                key={service.id}
                data={service}
              />
            ))}
          </Flex>
        </div>
      ))}
    </div>
  );
};
