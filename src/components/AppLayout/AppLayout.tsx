import {PropsWithChildren} from 'react';

import {Layout} from 'antd';

import {useResponsive} from '@hooks/useResponsive.ts';

import {AppHeader} from './Header';
import {Menu} from './Menu';

import styles from './AppLayout.module.scss';

const {Content} = Layout;

export const AppLayout = ({children}: PropsWithChildren) => {
  const {isMobile} = useResponsive();
  return (
    <Layout hasSider>
      {!isMobile && <Menu />}
      <Layout>
        <AppHeader />
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
