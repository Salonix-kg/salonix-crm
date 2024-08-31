import {Col, Row} from 'antd';

import {LoginForm} from './LoginForm';

import styles from './Login.module.scss';

export const Login = () => {
  return (
    <Row>
      <Col xs={24} md={10} lg={8} xl={7} xxl={6}>
        <LoginForm />
      </Col>
      <Col
        xs={0}
        md={14}
        lg={16}
        xl={17}
        xxl={18}
        className={styles.background}></Col>
    </Row>
  );
};
