import {cloneElement, PropsWithChildren, ReactElement} from 'react';
import classNames from 'classnames';

import {Flex, Typography} from 'antd';

import styles from './DatePickerContainer.module.scss';

export type DatePickerContainerProps = PropsWithChildren & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const DatePickerContainer = ({
  label,
  error,
  children,
  containerClassName,
}: DatePickerContainerProps) => {
  return (
    <Flex
      gap={2}
      vertical
      className={classNames(containerClassName, styles.container)}>
      {label && (
        <Typography.Text className={styles.label}>{label}</Typography.Text>
      )}
      {cloneElement(children as ReactElement, {
        status: error ? 'error' : undefined,
      })}
      {error && (
        <Typography.Text className={styles.error}>{error}</Typography.Text>
      )}
    </Flex>
  );
};
