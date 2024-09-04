import {ReactNode, useCallback} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import classNames from 'classnames';

import {Col, Flex, Row} from 'antd';

import {Button} from '@components/Button';

import {durationFormatter} from '@utils/date';
import {priceFormatter} from '@utils/priceFormatter.ts';

import {theme} from '@styles/theme.ts';

import styles from './ServiceCard.module.scss';

export type ServiceCardData = {
  id: number;
  title: string;
  /**
   * @type duration
   * @description в минутах
   */
  duration: number;
  price: number;
};

export type ServiceCardProps = {
  className?: string;
  data: ServiceCardData;
  onClick?: (data: ServiceCardData) => void;
  onRemove?: (data: ServiceCardData) => void;
  prefix?: ReactNode;
  animation?: boolean;
};

export const ServiceCard = ({
  className,
  data,
  onClick,
  onRemove,
  prefix,
  animation = true,
}: ServiceCardProps) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(data);
  }, [data, onClick]);

  const handleRemove = useCallback(() => {
    if (onRemove) onRemove(data);
  }, [data, onRemove]);

  return (
    <div
      onClick={handleClick}
      className={classNames(styles.container, className, {
        [styles.animation]: animation,
      })}>
      <Flex gap={12}>
        {prefix}
        <Row className={styles.block} justify="space-between" gutter={4}>
          <Col>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.duration}>
              {durationFormatter(data.duration)}
            </div>
          </Col>
          <Col>
            <div
              className={classNames(styles.price, {
                [styles.hidePriceOnHover]: !!onRemove,
              })}>
              {priceFormatter(data.price)}
            </div>
          </Col>
        </Row>
      </Flex>
      {onRemove && (
        <Button
          type="text"
          className={classNames(styles.remove, 'button-with-icon')}
          icon={<FaRegTrashAlt size={16} color={theme.red} />}
          onClick={handleRemove}
        />
      )}
    </div>
  );
};
