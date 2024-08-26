import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import {Input as AntInput, InputProps} from 'antd';

import styles from './TextInput.module.scss';

export type TextInputProps = InputProps & {
  label?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const TextInput = forwardRef<AntInput, TextInputProps>(
  (
    {label, error, containerClassName, className, required = true, ...props},
    ref,
  ) => {
    const SelectedInput = useMemo(
      () => (props.type === 'password' ? AntInput.Password : AntInput),
      [props.type],
    );

    return (
      <div
        className={classNames(styles.textInputContainer, containerClassName, {
          [styles.textInputWithLabel]: label,
        })}>
        {label && (
          <div className={styles.labelContainer}>
            <span className={styles.label}>{label}</span>
            {!required && (
              <span className={styles.notRequired}>(НЕОБЯЗАТЕЛЬНО)</span>
            )}
          </div>
        )}
        <SelectedInput
          ref={ref}
          className={classNames(styles.textInput, className, {
            [styles.errorInput]: !!error,
          })}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
