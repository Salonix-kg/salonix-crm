import {forwardRef} from 'react';
import classNames from 'classnames';
import {DefaultOptionType} from 'rc-select/lib/Select';

import {Select as AntSelect, SelectProps as AntSelectProps} from 'antd';

import styles from './Select.module.scss';

export type SelectProps = AntSelectProps & {
  label?: string;
  error?: string;
  required?: boolean;
  enableFilter?: boolean;
  withoutPadding?: boolean;
  containerClassName?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Select = forwardRef<AntSelect, SelectProps>(
  (
    {
      label,
      error,
      className,
      required = true,
      withoutPadding = false,
      enableFilter,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const filterOption = (input: string, option?: DefaultOptionType) =>
      ((option?.label as string) ?? '')
        .toLowerCase()
        .includes(input.toLowerCase());

    return (
      <div
        className={classNames(
          styles.selectContainer,
          {
            [styles.withoutPadding]: withoutPadding,
            [styles.withLabel]: label,
          },
          containerClassName,
        )}>
        {label && (
          <div className={styles.labelContainer}>
            <span className={styles.label}>{label}</span>
            {!required && (
              <span className={styles.notRequired}>(НЕОБЯЗАТЕЛЬНО)</span>
            )}
          </div>
        )}
        <AntSelect
          ref={ref}
          className={classNames(styles.select, className, {
            [styles.errorSelect]: !!error,
          })}
          {...props}
          filterOption={enableFilter && filterOption}
          showSearch={enableFilter}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
