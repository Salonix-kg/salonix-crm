import {PropsWithChildren} from 'react';

import {Layout} from 'antd';

import {AppHeader} from './Header';
import {Menu} from './Menu';

import styles from './AppLayout.module.scss';

const {Content} = Layout;

export const AppLayout = ({children}: PropsWithChildren) => {
  return (
    <Layout hasSider>
      <Menu />
      <Layout>
        <AppHeader />
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
