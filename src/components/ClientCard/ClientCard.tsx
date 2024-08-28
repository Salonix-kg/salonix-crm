import {ReactNode} from 'react';

import {Flex} from 'antd';

import styles from './ClientCard.module.scss';

export type ClientCardProps = {
  title: string;
  phoneNumber?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export const ClientCard = ({
  title,
  phoneNumber,
  icon,
  onClick,
}: ClientCardProps) => {
  return (
    <Flex className={styles.container} gap={12} onClick={onClick}>
      <div className={styles.icon}>{icon || title.slice(0, 1)}</div>
      <Flex vertical justify="center">
        <div className={styles.title}>{title}</div>
        <div className={styles.phoneNumber}>{phoneNumber}</div>
      </Flex>
    </Flex>
  );
};
