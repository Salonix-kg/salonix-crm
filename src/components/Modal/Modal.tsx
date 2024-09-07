import {Modal as AntModal, ModalProps as AntModalProps} from 'antd';

import styles from './Modal.module.scss';

export type ModalProps = AntModalProps & {};

export const Modal = ({children, ...props}: ModalProps) => {
  return (
    <AntModal
      classNames={{
        content: styles.content,
        body: styles.body,
        header: styles.header,
        footer: styles.footer,
      }}
      {...props}>
      {children}
    </AntModal>
  );
};
