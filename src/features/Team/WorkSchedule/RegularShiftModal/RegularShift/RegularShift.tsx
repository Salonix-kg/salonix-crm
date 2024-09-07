import {Checkbox, Col, Flex, Row, TimePicker, Typography} from 'antd';

import {HelperText} from '@components/HelperText';

import styles from './RegularShift.module.scss';

export type RegularShiftProps = {
  title: string;
  checked?: boolean;
};

export const RegularShift = ({title, checked}: RegularShiftProps) => {
  return (
    <Row className={styles.container} gutter={12} justify="space-between">
      <Col xs={12}>
        <Flex gap={12}>
          <Checkbox checked={checked} />
          <Flex vertical>
            <Typography.Text>{title}</Typography.Text>
            <HelperText>8 ч</HelperText>
          </Flex>
        </Flex>
      </Col>
      <Col xs={12}>
        {checked ? (
          <Flex gap={12} justify="space-between">
            <TimePicker
              minuteStep={10}
              showSecond={false}
              showNow={false}
              suffixIcon={false}
              allowClear={false}
              placeholder="00:00"
            />
            <TimePicker
              minuteStep={10}
              showSecond={false}
              showNow={false}
              suffixIcon={false}
              allowClear={false}
              placeholder="00:00"
            />
          </Flex>
        ) : (
          <HelperText>Без смен</HelperText>
        )}
      </Col>
    </Row>
  );
};
