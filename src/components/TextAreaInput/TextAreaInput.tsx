import {forwardRef} from 'react';
import classNames from 'classnames';

import {Input as AntInput} from 'antd';
import type {TextAreaProps} from 'antd/es/input';

import styles from '../TextInput/TextInput.module.scss';

export type TextAreaInputProps = TextAreaProps & {
  label?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
};

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    {label, error, containerClassName, className, required = true, ...props},
    ref,
  ) => {
    return (
      <div
        className={classNames(styles.textInputContainer, containerClassName, {
          [styles.textInputWithLabel]: label,
          [styles.textInputWithError]: error,
        })}>
        {label && (
          <div className={styles.labelContainer}>
            <span className={styles.label}>{label}</span>
            {!required && (
              <span className={styles.notRequired}>(НЕОБЯЗАТЕЛЬНО)</span>
            )}
          </div>
        )}
        <AntInput.TextArea
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
