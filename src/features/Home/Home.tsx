import {Col, Row} from 'antd';

import {ContentPadding} from '@components/ContentPadding';

import {PopularServices} from './PopularServices';
import {RecentSales} from './RecentSales';

export const Home = () => {
  return (
    <ContentPadding>
      <Row gutter={[20, 20]} justify="center">
        <Col xs={24} md={12}>
          <RecentSales />
        </Col>
        <Col xs={24} md={12}>
          <PopularServices />
        </Col>
      </Row>
    </ContentPadding>
  );
};
