import {useCallback, useMemo, useState} from 'react';
import {MdAdd} from 'react-icons/md';
import {useSetAtom} from 'jotai';

import {Menu, Popover} from 'antd';

import {isRegularShiftModalOpenAtom} from '@atoms/team/regularShift';
import {isShiftModalOpenAtom} from '@atoms/team/shift';

import styles from './AddShiftCard.module.scss';

export const AddShiftCard = () => {
  const setIsShiftModalOpen = useSetAtom(isShiftModalOpenAtom);
  const setIsRegularShiftModalOpen = useSetAtom(isRegularShiftModalOpenAtom);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleAddShift = useCallback(() => {
    setIsShiftModalOpen(true);
    setIsPopoverOpen(false);
  }, [setIsShiftModalOpen]);

  const handleSetRegularShift = useCallback(() => {
    setIsRegularShiftModalOpen(true);
    setIsPopoverOpen(false);
  }, [setIsRegularShiftModalOpen]);

  const items = useMemo(
    () => [
      {
        label: 'Добавить смену',
        key: 'add-shift',
        onClick: handleAddShift,
      },
      {
        label: 'Установить регулярные смены',
        key: 'set-regular-shift',
        onClick: handleSetRegularShift,
      },
    ],
    [handleAddShift, handleSetRegularShift],
  );

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      content={<Menu selectedKeys={[]} className={styles.menu} items={items} />}
      placement="bottom"
      arrow={false}
      trigger="click">
      <div className={styles.container}>
        <MdAdd />
      </div>
    </Popover>
  );
};
