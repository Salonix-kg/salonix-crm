import {ChangeEvent, useCallback, useEffect} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {MdOutlineAddAPhoto} from 'react-icons/md';
import {useAtomValue} from 'jotai/index';

import {Col, DatePicker, Flex, Row, Upload} from 'antd';
import {RcFile, UploadChangeParam} from 'antd/es/upload';

import {DatePickerContainer} from '@components/DatePickerContainer';
import {TextInput} from '@components/TextInput';

import {selectedMemberFormAtom} from '@atoms/team/member';

import {dateFormat} from '@utils/date';
import {getAvatarUrl} from '@utils/member';

import {ProfileSchema} from './Profile.schema.ts';

import styles from './Profile.module.scss';

export type ProfileProps = {
  form: UseFormReturn<ProfileSchema>;
};

export const Profile = ({form}: ProfileProps) => {
  const {control, setValue} = form;
  const selectedMember = useAtomValue(selectedMemberFormAtom);

  const handlePhotoChange = useCallback(
    (info: UploadChangeParam) => {
      const file = info.file as RcFile;
      setValue('avatar', file);
      return;
    },
    [setValue],
  );

  useEffect(() => {
    form.reset(selectedMember || {});
  }, [form, selectedMember]);

  const formatPhoneNumber = (value: string): string => {
    return value.replace(/(\d{3})(?=\d)/g, '$1 ');
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setValue('phoneNumber', formattedValue, {shouldValidate: true});
  };

  return (
    <Flex className={styles.container} vertical gap={12}>
      <Flex vertical align="center">
        <Controller
          name="avatar"
          control={control}
          render={({field}) => (
            <Upload
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              accept=".png, .jpg, .jpeg"
              beforeUpload={file => {
                field.onChange(file);
                return false;
              }}
              onChange={info => handlePhotoChange(info)}>
              {field.value ? (
                <img
                  className={styles.avatar}
                  src={getAvatarUrl(field.value)}
                />
              ) : (
                <MdOutlineAddAPhoto size={24} />
              )}
            </Upload>
          )}
        />
      </Flex>
      <Flex vertical gap={3}>
        <Controller
          name="fullName"
          control={control}
          render={({field, fieldState}) => (
            <TextInput
              {...field}
              size="large"
              label="Имя"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({field, fieldState}) => (
            <TextInput
              {...field}
              onChange={handlePhoneNumberChange}
              addonBefore="+996"
              maxLength={11}
              size="large"
              label="Номер телефона"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({field, fieldState}) => (
            <TextInput
              {...field}
              size="large"
              label="Логин"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({field, fieldState}) => (
            <DatePickerContainer
              label="День рождения"
              error={fieldState.error?.message}>
              <DatePicker
                {...field}
                placeholder=""
                format={dateFormat}
                size="large"
              />
            </DatePickerContainer>
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({field, fieldState}) => (
            <TextInput
              {...field}
              size="large"
              label="Должность"
              error={fieldState.error?.message}
            />
          )}
        />
        <Row justify="space-between" gutter={12}>
          <Col xs={14}>
            <Controller
              name="commission"
              control={control}
              render={({field, fieldState}) => (
                <TextInput
                  {...field}
                  size="large"
                  type="number"
                  label="Комиссионные за обслуживание"
                  suffix="%"
                  onChange={e => field.onChange(+e.target.value)}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Col>
          <Col xs={10}>
            <Controller
              name="experience"
              control={control}
              render={({field, fieldState}) => (
                <TextInput
                  {...field}
                  size="large"
                  label="Опыт работы"
                  type="number"
                  suffix="год"
                  onChange={e => field.onChange(+e.target.value)}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
};
