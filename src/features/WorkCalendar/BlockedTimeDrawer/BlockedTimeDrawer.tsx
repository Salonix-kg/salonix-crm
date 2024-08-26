import {useCallback, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Dayjs} from 'dayjs';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {RESET} from 'jotai/utils';

import {Col, DatePicker, Drawer, Row, TimePicker} from 'antd';

import {Button} from '@components/Button';
import {DatePickerContainer} from '@components/DatePickerContainer';
import {Select} from '@components/Select';
import {TextInput} from '@components/TextInput';

import {
  addBlockedTimeAtom,
  blockedTimeFormAtom,
  isBlockedTimeDrawerOpenAtom,
} from '@atoms/calendar/blockedTime';
import {mastersAsOptionsAtom} from '@atoms/calendar/masters';

import {calendarFormat, dateFormat, disabledEndTime} from '@utils/date';
import {required} from '@utils/formHelpers.ts';

import {theme} from '@styles/theme.ts';

import {BlockedTimeSchema, blockedTimeSchema} from './BlockedTime.schema.ts';

export const BlockedTimeDrawer = () => {
  const [defaultValues, setDefaultValues] = useAtom(blockedTimeFormAtom);
  const [isOpen, setIsOpen] = useAtom(isBlockedTimeDrawerOpenAtom);
  const mastersAsOptions = useAtomValue(mastersAsOptionsAtom);

  const addBlockedTime = useSetAtom(addBlockedTimeAtom);

  const {handleSubmit, control, setValue, getValues, watch, reset} =
    useForm<BlockedTimeSchema>({
      resolver: zodResolver(blockedTimeSchema),
      defaultValues: defaultValues,
    });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleClose = useCallback(() => {
    setDefaultValues(RESET);
    setIsOpen(false);
  }, [setDefaultValues, setIsOpen]);

  const handleSave = useCallback(
    (data: BlockedTimeSchema) => {
      const {title, date, startTime, endTime, masterId} = data;

      addBlockedTime({
        id: defaultValues.id,
        title: title,
        date: date!.format(calendarFormat),
        startTime: startTime!.format('HH:mm'),
        endTime: endTime!.format('HH:mm'),
        masterId: +masterId,
      });

      handleClose();
    },
    [addBlockedTime, defaultValues, handleClose],
  );

  const handleTimeChange = useCallback(
    (type: 'startTime' | 'endTime', onChange: (val: Dayjs) => void) =>
      (date: Dayjs) => {
        onChange(date);

        if (type === 'startTime') {
          const endTime = getValues('endTime');
          if (endTime && date && endTime.isBefore(date)) {
            setValue('endTime', null);
          }
        }
      },
    [getValues, setValue],
  );

  return (
    <Drawer
      width={520}
      title="Добавить заблокированное время"
      onClose={handleClose}
      open={isOpen}
      footer={
        <Button
          onClick={handleSubmit(handleSave)}
          size="large"
          block
          type="primary"
          bg={theme.black}>
          Сохранить
        </Button>
      }>
      <Controller
        control={control}
        name="title"
        render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
          <TextInput
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            label="Заголовок"
            size="large"
            placeholder="Например, обеденное совещание"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <DatePickerContainer
            error={error?.message && required()}
            label="Дата">
            <DatePicker
              value={value || undefined}
              onChange={onChange}
              format={dateFormat}
              size="large"
            />
          </DatePickerContainer>
        )}
      />
      <Row gutter={12}>
        <Col xs={12}>
          <Controller
            control={control}
            name="startTime"
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <DatePickerContainer
                label="От"
                error={error?.message && required()}>
                <TimePicker
                  value={value || undefined}
                  onChange={handleTimeChange('startTime', onChange)}
                  onBlur={onBlur}
                  minuteStep={10}
                  showSecond={false}
                  showNow={false}
                  suffixIcon={false}
                  allowClear={false}
                  size="large"
                />
              </DatePickerContainer>
            )}
          />
        </Col>
        <Col xs={12}>
          <Controller
            control={control}
            name="endTime"
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <DatePickerContainer
                label="До"
                error={error?.message && required()}>
                <TimePicker
                  value={value || undefined}
                  onChange={handleTimeChange('endTime', onChange)}
                  minuteStep={10}
                  onBlur={onBlur}
                  showNow={false}
                  showSecond={false}
                  suffixIcon={false}
                  allowClear={false}
                  disabledTime={
                    watch('startTime')
                      ? disabledEndTime(watch('startTime'))
                      : undefined
                  }
                  size="large"
                />
              </DatePickerContainer>
            )}
          />
        </Col>
      </Row>
      <Controller
        control={control}
        name="masterId"
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Select
            label="Член команды"
            placeholder="Выберите члена команды"
            value={value}
            onChange={onChange}
            options={mastersAsOptions}
            size="large"
            error={error?.message}
          />
        )}
      />
    </Drawer>
  );
};
