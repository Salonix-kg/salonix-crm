import {Col, Row} from 'antd';

import {PopularServices} from './PopularServices';
import {RecentSales} from './RecentSales';

export const Home = () => {
  return (
    <Row justify="center">
      <Col xs={24} xl={18} xxl={16}>
        <Row gutter={[20, 20]} justify="center">
          <Col xs={24} md={12}>
            <RecentSales />
          </Col>
          <Col xs={24} md={12}>
            <PopularServices />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
