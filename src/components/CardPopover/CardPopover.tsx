import {ReactNode} from 'react';
import {SlOptionsVertical} from 'react-icons/sl';

import {Button, Flex, Popover} from 'antd';

import styles from './CardPopover.module.scss';

export type CardPopoverProps = {
  content?: ReactNode;
  isPopoverOpen?: boolean;
  setPopoverOpen?: (isOpen: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
};

export const CardPopover = ({
  content,
  isPopoverOpen,
  setPopoverOpen,
  onOk,
  onCancel,
}: CardPopoverProps) => {
  return (
    <Popover
      overlayClassName={styles.container}
      arrow={false}
      content={
        <>
          {content}
          <Flex justify="space-between" gap={12}>
            <Button size="large" block onClick={onCancel}>
              Назад
            </Button>
            <Button size="large" block type="primary" onClick={onOk}>
              Сохранить
            </Button>
          </Flex>
        </>
      }
      placement="bottomRight"
      trigger="click"
      open={isPopoverOpen}
      onOpenChange={setPopoverOpen}>
      <Button type="text">
        <SlOptionsVertical size={16} />
      </Button>
    </Popover>
  );
};
