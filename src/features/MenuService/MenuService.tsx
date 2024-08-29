import {useMemo} from 'react';
import {DownOutlined} from '@ant-design/icons';
import {useAtomValue} from 'jotai';

import {Card, Col, Dropdown, Menu, Row, Space, Tabs, Typography} from 'antd';

import {Button} from '@components/Button';

import {categoriesAtom,Category} from '@atoms/catalog/categories';

import {theme} from '@styles/theme';

import styles from './MenuService.module.scss';

const menuItems = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
];

const menu = <Menu items={menuItems} />;

const TabHeader = ({category}: {category: Category}) => (
  <Row justify="space-between">
    <Typography.Title className={styles.categoryTitle} level={4}>
      {category.label}
    </Typography.Title>
    <Dropdown overlay={menu}>
      <Button size="large" type="default">
        <Space>
          Действие
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Row>
);
export const MenuService = () => {
  const categories = useAtomValue(categoriesAtom);
  const categoryItems = useMemo(
    () =>
      categories.map(category => ({
        ...category,
        label: <span className={styles.tabTitle}>{category.label}</span>,
        children: (
          <div>
            <TabHeader category={category} />
            {category.children.map(item => (
              <>
                <Card title={item.label} />
                <br />
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
        label: <span className={styles.tabTitle}>Все категории</span>,
        children: categories.map(category => (
          <div>
            <TabHeader category={category} />
            {category.children.map(item => (
              <>
                <Card title={item.label} />
                <br />
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
    <div className={styles.container}>
      <Row justify="space-between">
        <Col xs={24} md={12}>
          <Typography.Title level={2}>Меню обслуживания</Typography.Title>
          <Typography.Text type="secondary">
            Просмотр услуг, предлагаемых вашей компанией, и управление ими.
          </Typography.Text>
        </Col>
        <Col xs={12} md={4}>
          <Button
            bg={theme.black}
            size="large"
            block
            type="primary"
            onClick={() => {}}>
            Указать
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <Card>
        <Typography.Title className={styles.categoryTitle} level={4}>
          Категории
        </Typography.Title>
        <Tabs size="large" tabPosition={'left'} items={tabsItems} />
      </Card>
    </div>
  );
};
