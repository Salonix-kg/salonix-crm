import {ButtonProps as AntButtonProps} from 'antd';
import {Button as AntButton} from 'antd';

export type ButtonProps = AntButtonProps & {
  bg?: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <AntButton
      {...props}
      style={{
        ...props.style,
        backgroundColor: props.bg ? props.bg : props.style?.backgroundColor,
      }}
    />
  );
};
