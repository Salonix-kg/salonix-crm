import {Layout} from 'antd';

import {HeaderPopover} from '../HeaderPopover';

const {Header} = Layout;

import styles from './Header.module.scss';

export const AppHeader = () => {
  return (
    <Header className={styles.header}>
      <HeaderPopover />
    </Header>
  );
};
