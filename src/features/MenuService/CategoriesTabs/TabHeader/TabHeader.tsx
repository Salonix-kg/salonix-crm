import {DownOutlined} from '@ant-design/icons';

import {Dropdown, Menu, Row, Space, Typography} from 'antd';

import {Button} from '@components/Button';

import {Category} from '@atoms/catalog/categories';

import styles from '../../MenuService.module.scss';

type TabHeaderProps = {
  category: Category;
  editCallback: (category: Category) => void;
  handleAddService: (category: Category) => void;
};

export const TabHeader = ({
  category,
  editCallback,
  handleAddService,
}: TabHeaderProps) => {
  const menuData = [
    {
      label: 'Редактировать',
      key: '1',
      onClick: () => editCallback(category),
    },
    {
      label: 'Добавить услуги',
      key: '2',
      onClick: () => handleAddService(category),
    },
    {
      label: 'Окончательно удалить',
      key: '3',
    },
  ];

  const menu = <Menu items={menuData} />;

  return (
    <Row justify="space-between" align="middle">
      <Typography.Title className={styles.categoryTitle} level={4}>
        {category.label}
      </Typography.Title>
      <Dropdown className={styles.dropdownButton} overlay={menu}>
        <Button size="middle" type="default">
          <Space>
            Действие
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Row>
  );
};
