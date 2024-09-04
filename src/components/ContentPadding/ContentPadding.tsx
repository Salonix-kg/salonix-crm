import {PropsWithChildren} from 'react';

import {Col, Row} from 'antd';

export const ContentPadding = ({children}: PropsWithChildren) => {
  return (
    <Row justify="center">
      <Col xs={24} xl={18} xxl={16}>
        {children}
      </Col>
    </Row>
  );
};
