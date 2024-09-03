import {useCallback, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DownOutlined} from '@ant-design/icons';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtomValue, useSetAtom} from 'jotai';

import {Col, Dropdown, Menu, Modal, Row, Space, Tabs, Typography} from 'antd';

import {Button} from '@components/Button';
import {ServiceCard} from '@components/ServiceCard';
import {TextAreaInput} from '@components/TextAreaInput/TextAreaInput';
import {TextInput} from '@components/TextInput';

import {categoriesAtom, Category} from '@atoms/catalog/categories';
import {setCategoryAtom} from '@atoms/catalog/categories/setCategory.atoms';

import {useResponsive} from '@hooks/useResponsive';

import {theme} from '@styles/theme';

import {
  CreateCategorySchema,
  createCategorySchema,
} from './CreateCategory.schema';

import styles from '../MenuService.module.scss';

type TabHeaderProps = {
  category: Category;
  editCallback: (category: Category) => void;
};

const getMenuData = ({category, editCallback}: TabHeaderProps) => [
  {
    label: 'Редактировать',
    key: '1',
    onClick: () => editCallback(category),
  },
  {
    label: 'Добавить услуги',
    key: '2',
  },
  {
    label: 'Окончательно удалить',
    key: '3',
  },
];

const getMenu = ({category, editCallback}: TabHeaderProps) => (
  <Menu items={getMenuData({category, editCallback})} />
);

const TabHeader = ({category, editCallback}: TabHeaderProps) => (
  <Row justify="space-between" align="middle">
    <Typography.Title className={styles.categoryTitle} level={4}>
      {category.label}
    </Typography.Title>
    <Dropdown
      className={styles.dropdownButton}
      overlay={getMenu({category, editCallback})}>
      <Button size="middle" type="default">
        <Space>
          Действие
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Row>
);

export const CategoriesTabs = () => {
  const categories = useAtomValue(categoriesAtom);
  const setCategory = useSetAtom(setCategoryAtom);

  const {isMobile} = useResponsive();

  const {handleSubmit, control, reset, setValue} =
    useForm<CreateCategorySchema>({
      resolver: zodResolver(createCategorySchema),
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleEditCategory = useCallback((category: Category) => {
    handleOpenModal();
    setValue('title', category.label);
    setValue('key', category.key);
    setValue('children', category.children);
  }, []);

  const handleCreateCategory = useCallback((data: CreateCategorySchema) => {
    const value = {
      label: data.title,
      key: data?.key ?? Math.random().toString(),
      children: data.children ?? [],
    };
    setCategory(value);
    reset();
    handleCloseModal();
  }, []);

  const categoryItems = useMemo(
    () =>
      categories.map(category => ({
        ...category,
        closable: false,
        label: (
          <p className={styles.tabTitle}>
            {category.label}
            <span className={styles.categoryCount}>
              {category.children.length}
            </span>
          </p>
        ),
        children: (
          <div>
            <TabHeader category={category} editCallback={handleEditCategory} />
            {category.children.map(service => (
              <>
                <ServiceCard
                  key={service.id}
                  data={service}
                  onClick={() => {}}
                />
              </>
            ))}
          </div>
        ),
      })),
    [categories],
  );

  const tabsItems = useMemo(
    () => [
      {
        key: 'all',
        label: (
          <div className={styles.tabTitle}>
            <span>Все категории </span>
            <span className={styles.categoryCount}>10</span>
          </div>
        ),
        closable: false,
        children: categories.map(category => (
          <div>
            <TabHeader category={category} editCallback={handleEditCategory} />
            {category.children.map(service => (
              <>
                <ServiceCard
                  key={service.id}
                  data={service}
                  onClick={() => {}}
                />
              </>
            ))}
          </div>
        )),
      },
      ...categoryItems,
    ],
    [categoryItems, categories],
  );

  return (
    <>
      <Modal
        title="Добавить категорию"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={
          <Row gutter={[18, 6]} justify="space-between">
            <Col span={12}>
              <Button block size="large" type="default">
                Отменить
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={handleSubmit(handleCreateCategory)}
                block
                bg={theme.black}
                size="large"
                type="primary">
                Указать
              </Button>
            </Col>
          </Row>
        }>
        <br />
        <br />
        <Controller
          control={control}
          name="title"
          render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
            <TextInput
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              label="Название категории"
              size="large"
              placeholder="Например, уход за волосами"
              error={error?.message}
            />
          )}
        />
        <br />
        <Controller
          control={control}
          name="description"
          render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
            <TextAreaInput
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              label="Название категории"
              size="large"
              error={error?.message}
            />
          )}
        />
        <br />
      </Modal>
      <Tabs
        type="editable-card"
        onEdit={handleOpenModal}
        tabBarGutter={6}
        animated={{inkBar: true, tabPane: true}}
        size={isMobile ? 'small' : 'large'}
        tabPosition={isMobile ? 'top' : 'left'}
        items={tabsItems}
        destroyInactiveTabPane={false}
      />
    </>
  );
};
