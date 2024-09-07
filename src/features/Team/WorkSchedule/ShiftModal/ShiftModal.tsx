import {useCallback} from 'react';
import {useAtom} from 'jotai';

import {Col, Row, TimePicker} from 'antd';

import {DatePickerContainer} from '@components/DatePickerContainer';
import {HelperText} from '@components/HelperText';
import {Modal} from '@components/Modal';

import {isShiftModalOpenAtom} from '@atoms/team/shift';

export const ShiftModal = () => {
  const [isOpen, setIsOpen] = useAtom(isShiftModalOpenAtom);

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
      title="Добавить смену">
      <Row gutter={12}>
        <Col xs={12}>
          <DatePickerContainer label="Время начала">
            <TimePicker
              minuteStep={10}
              showSecond={false}
              showNow={false}
              suffixIcon={false}
              allowClear={false}
              placeholder="00:00"
            />
          </DatePickerContainer>
        </Col>
        <Col xs={12}>
          <DatePickerContainer label="Время окончания">
            <TimePicker
              minuteStep={10}
              showSecond={false}
              showNow={false}
              suffixIcon={false}
              allowClear={false}
              placeholder="00:00"
            />
          </DatePickerContainer>
        </Col>
      </Row>
      <HelperText highlightedTexts={["'установить регулярные смены'"]}>
        Вы только редактируете смену на этот день. Чтобы установить регулярные
        смены, перейдите в раздел 'установить регулярные смены'
      </HelperText>
    </Modal>
  );
};
