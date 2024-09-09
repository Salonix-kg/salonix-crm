import {Card, Col, Row, Typography} from 'antd';

import {useResponsive} from '@hooks/useResponsive';

import {CategoriesTabs} from './CategoriesTabs';

import styles from './MenuService.module.scss';

export const MenuService = () => {
  const {isMobile} = useResponsive();

  return (
    <div className={styles.container}>
      <Row justify={isMobile ? 'center' : 'space-between'}>
        <Col xs={24} md={12}>
          <Typography.Title level={2}>Меню обслуживания</Typography.Title>
          <Typography.Text type="secondary">
            Просмотр услуг, предлагаемых вашей компанией, и управление ими.
          </Typography.Text>
        </Col>
        {/* <Col xs={12} md={4}>
          <Button
            className={styles.headerButton}
            bg={theme.black}
            size="large"
            block
            type="primary"
            onClick={() => {}}>
            Указать
          </Button>
        </Col> */}
      </Row>
      <br />
      <br />
      <Card>
        {!isMobile && (
          <Typography.Title className={styles.categoryTitle} level={4}>
            Категории
          </Typography.Title>
        )}
        <CategoriesTabs />
      </Card>
    </div>
  );
};
