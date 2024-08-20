import {FaUserCircle} from 'react-icons/fa';

import {Layout} from 'antd';

import {theme} from '@styles/theme.ts';

const {Header} = Layout;

import styles from './Header.module.scss';

export const AppHeader = () => {
  return (
    <Header className={styles.header}>
      <FaUserCircle size={32} color={theme['dark-slate-grey']} />
    </Header>
  );
};
