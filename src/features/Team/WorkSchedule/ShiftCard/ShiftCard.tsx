import {useCallback, useMemo, useState} from 'react';
import {useSetAtom} from 'jotai';

import {Menu, Modal, Popover} from 'antd';

import {isRegularShiftModalOpenAtom} from '@atoms/team/regularShift';
import {isShiftModalOpenAtom} from '@atoms/team/shift';
import {WorkDay} from '@atoms/team/workSchedule';

import styles from './ShiftCard.module.scss';

export type WorkHoursCardProps = {
  workDay: WorkDay;
};

export const ShiftCard = ({workDay}: WorkHoursCardProps) => {
  const setIsShiftModalOpen = useSetAtom(isShiftModalOpenAtom);
  const setIsRegularShiftModalOpen = useSetAtom(isRegularShiftModalOpenAtom);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [modal, contextHolder] = Modal.useModal();

  const handleEditShit = useCallback(() => {
    setIsShiftModalOpen(true);
    setIsPopoverOpen(false);
  }, [setIsShiftModalOpen]);

  const handleSetRegularShift = useCallback(() => {
    setIsRegularShiftModalOpen(true);
    setIsPopoverOpen(false);
  }, [setIsRegularShiftModalOpen]);

  const handleRemoveShift = useCallback(() => {
    setIsPopoverOpen(false);
    modal.confirm({
      title: 'Удалить смену',
      okText: 'Удалить',
      content:
        'Вы уверены, что хотите удалить эту смену? Это действие нельзя отменить',
      okButtonProps: {danger: true},
      cancelText: 'Отменить',
    });
  }, [modal]);

  const items = useMemo(
    () => [
      {
        label: 'Редактировать этот день',
        key: 'edit-shift',
        onClick: handleEditShit,
      },
      {
        label: 'Установить регулярные смены',
        key: 'set-regular-shift',
        onClick: handleSetRegularShift,
      },
      {
        label: 'Удалить смену',
        key: 'remove-shift',
        danger: true,
        onClick: handleRemoveShift,
      },
    ],
    [handleEditShit, handleRemoveShift],
  );

  return (
    <>
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        content={
          <Menu selectedKeys={[]} className={styles.menu} items={items} />
        }
        placement="bottom"
        arrow={false}
        trigger="click">
        <div
          className={
            styles.container
          }>{`${workDay.startTime} - ${workDay.endTime}`}</div>
      </Popover>
      {contextHolder}
    </>
  );
};
