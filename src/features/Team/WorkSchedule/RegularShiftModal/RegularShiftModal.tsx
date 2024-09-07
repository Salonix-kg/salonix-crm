import {useCallback} from 'react';
import {useAtom} from 'jotai';

import {Flex} from 'antd';

import {HelperText} from '@components/HelperText';
import {Modal} from '@components/Modal';

import {isRegularShiftModalOpenAtom} from '@atoms/team/regularShift';

import {RegularShift} from './RegularShift';

const daysOfWeek = [
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
  'воскресенье',
];

import styles from './RegularShiftModal.module.scss';

export const RegularShiftModal = () => {
  const [isOpen, setIsOpen] = useAtom(isRegularShiftModalOpenAtom);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Modal
      closeIcon={null}
      okText="Сохранить"
      cancelText="Отменить"
      open={isOpen}
      onCancel={handleClose}
      onClose={handleClose}
      title="Установить регулярные смены">
      <Flex gap={8} vertical>
        {daysOfWeek.map(day => (
          <RegularShift
            checked={!['суббота', 'воскресенье'].includes(day)}
            title={day}
          />
        ))}
      </Flex>
      <HelperText className={styles.helper}>
        Сохраненные изменения будут применяться ко всем предстоящим сменам
      </HelperText>
    </Modal>
  );
};
