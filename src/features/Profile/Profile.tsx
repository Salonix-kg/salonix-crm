import {useCallback} from 'react';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {useAtomValue} from 'jotai';

import {Card, Col, Row, Space, Typography} from 'antd';

import {Button} from '@components/Button';

import {userAtom} from '@atoms/auth';

import {phoneNumberFormatter} from '@utils/phoneNumberFormatter.ts';

import {theme} from '@styles/theme.ts';

import styles from './Prodile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Row justify="center">
      <Col xs={24} xl={18} xxl={16}>
        <Typography.Title level={4}>
          <Button
            onClick={handleBackClick}
            type="text"
            className="button-with-icon"
            style={{color: theme['primary-color']}}>
            <MdOutlineKeyboardBackspace />
          </Button>{' '}
          Профиль
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>
          Обеспечьте безопасность своей учетной записи и управляйте своей личной
          информацией
        </Typography.Paragraph>
        <Space
          size="large"
          direction="vertical"
          className={styles.cardContainer}>
          <Card
            title="Персональные данные"
            extra={
              <Button type="text" className={styles.edit}>
                Редактировать
              </Button>
            }>
            <Typography.Text className={styles.label}>
              Юридическое наименование
            </Typography.Text>
            <Typography.Text>{user?.fullName}</Typography.Text>
          </Card>
          <Card
            title="Контактная информация"
            extra={
              <Button type="text" className={styles.edit}>
                Редактировать
              </Button>
            }>
            <Space direction="vertical" size="large">
              <div>
                <Typography.Text className={styles.label}>
                  Номер мобильного телефона
                </Typography.Text>
                <Typography.Text>
                  {phoneNumberFormatter(user!.phoneNumber)}
                </Typography.Text>
              </div>
              <div>
                <Typography.Text className={styles.label}>
                  Адрес электронной почты
                </Typography.Text>
                <Typography.Text>{user?.email}</Typography.Text>
              </div>
            </Space>
          </Card>
          <Card
            title="Безопасность"
            extra={
              <Button type="text" className={styles.editPass}>
                Сменить пароль
              </Button>
            }>
            <Typography.Text className={styles.label}>Пароль</Typography.Text>
            <Typography.Text>***********</Typography.Text>
          </Card>
          <Card title="Рабочие пространства"></Card>
        </Space>
      </Col>
    </Row>
  );
};
