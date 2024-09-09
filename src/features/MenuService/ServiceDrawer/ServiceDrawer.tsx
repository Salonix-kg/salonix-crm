import {Suspense, useCallback, useEffect, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {useAtomValue, useSetAtom} from 'jotai';

import {Badge, Col, Drawer, Row, Segmented} from 'antd';

import {Button} from '@components/Button';
import {Select} from '@components/Select';
import {TextAreaInput} from '@components/TextAreaInput';
import {TextInput} from '@components/TextInput';

import {categoriesAtom,Category} from '@atoms/catalog/categories';
import {setCategoryAtom} from '@atoms/catalog/categories/setCategory.atoms';

import {theme} from '@styles/theme.ts';

import {ServiceDrawerSchema, serviceDrawerSchema} from './ServiceDrawer.schema';

import styles from './ServiceDrawer.module.scss';

dayjs.extend(duration);

const timeOptions = Array.from(
  {length: (6 * 60) / 5},
  (_, i) => 5 * (i + 1),
).map(minutes => ({
  value: minutes,
  label:
    minutes >= 60
      ? dayjs.duration(minutes, 'minutes').format('H[h] mm[min]')
      : dayjs.duration(minutes, 'minutes').format('m[min]'),
}));

type ServiceDrawerProps = {
  setSelectedCategory: (a: Category | null) => void;
  selectedCategory: Category | null;
};

export const ServiceDrawer = ({
  selectedCategory,
  setSelectedCategory,
}: ServiceDrawerProps) => {
  const categories = useAtomValue(categoriesAtom);
  const setCategory = useSetAtom(setCategoryAtom);

  const {handleSubmit, control, reset} = useForm<ServiceDrawerSchema>({
    resolver: zodResolver(serviceDrawerSchema),
  });

  const handleClose = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const handleSave = useCallback(
    async (data: ServiceDrawerSchema) => {
      if (!selectedCategory) return;

      const value = {
        label: selectedCategory.label,
        key: selectedCategory.key,
        children: [
          ...(selectedCategory?.children ?? []),
          {
            id: Math.random(),
            title: data.title,
            price: data.price,
            duration: data.duration,
          },
        ],
      };
      setCategory(value);
      reset({});
      handleClose();
    },
    [selectedCategory],
  );

  const sections = useMemo(
    () => [
      {
        label: (
          <Badge offset={[8, 0]} color={theme['primary-color']}>
            Основные сведения
          </Badge>
        ),
        value: 'main',
      },
    ],
    [],
  );

  useEffect(() => {
    reset({category: selectedCategory?.key, duration: 60});
  }, [selectedCategory]);

  const categoriesOption = categories.map(category => ({
    label: category.label,
    value: category.key,
  }));

  return (
    <Drawer
      title={'Новая услуга'}
      width={600}
      open={!!selectedCategory}
      classNames={{body: styles.body}}
      footer={
        <Button
          onClick={handleSubmit(handleSave)}
          block
          bg={theme.black}
          size="large"
          type="primary">
          Сохранить
        </Button>
      }
      onClose={handleClose}>
      <div className={styles.header}>
        <Segmented
          value={'main'}
          block
          options={sections}
          //   onChange={setActiveSection}
        />
      </div>
      <Suspense>
        <div className={styles.content}>
          <Controller
            control={control}
            name="title"
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <TextInput
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                label="Название услуги"
                size="large"
                placeholder="Добавьте название услуги, например «Мужская стрижка»"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <Select
                label="Категория меню"
                value={value}
                onChange={onChange}
                options={categoriesOption}
                size="large"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <TextAreaInput
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                label="Описание"
                placeholder="Добавить краткое описание"
                size="large"
                error={error?.message}
              />
            )}
          />
          <br />
          <Row justify="space-between">
            <Col xs={10}>
              <Controller
                control={control}
                name="duration"
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <Select
                    label="Длительность"
                    value={value}
                    onChange={onChange}
                    options={timeOptions}
                    size="large"
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col xs={10}>
              <Controller
                control={control}
                name="price"
                render={({
                  field: {value, onBlur, onChange},
                  fieldState: {error},
                }) => (
                  <TextInput
                    type="number"
                    value={value || ''}
                    onChange={e => onChange(+e.target.value)}
                    onBlur={onBlur}
                    label="Цена"
                    size="large"
                    error={error?.message}
                  />
                )}
              />
            </Col>
          </Row>
          <br />
        </div>
      </Suspense>
    </Drawer>
  );
};
