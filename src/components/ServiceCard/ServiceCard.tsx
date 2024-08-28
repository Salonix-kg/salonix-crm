import {useCallback} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import classNames from 'classnames';

import {Col, Row} from 'antd';

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
  data: ServiceCardData;
  onClick?: (data: ServiceCardData) => void;
  onRemove?: (data: ServiceCardData) => void;
};

export const ServiceCard = ({data, onClick, onRemove}: ServiceCardProps) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(data);
  }, [data, onClick]);

  const handleRemove = useCallback(() => {
    if (onRemove) onRemove(data);
  }, [data, onRemove]);

  return (
    <div onClick={handleClick} className={styles.container}>
      <Row justify="space-between" gutter={4}>
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
