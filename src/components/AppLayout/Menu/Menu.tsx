import {useCallback, useMemo} from 'react';
import {FaCalendarDays} from 'react-icons/fa6';
import {IoHome} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';

import {Layout, Menu as AntMenu, MenuProps} from 'antd';

import {ROUTE_PATHS} from '@routes/routes.types.ts';

import styles from './Menu.module.scss';

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const Menu = () => {
  const navigate = useNavigate();

  const handleMenuClick = useCallback(
    (info: {key: string}) => {
      navigate(info.key);
    },
    [navigate],
  );

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'Главная',
        icon: <IoHome size={20} />,
        key: ROUTE_PATHS.HOME,
      },
      {
        label: 'Календарь',
        icon: <FaCalendarDays size={20} />,
        key: ROUTE_PATHS.WORK_CALENDAR,
      },
    ],
    [],
  );

  return (
    <Sider trigger={null} collapsed={true} className={styles.container}>
      <div className={styles.logo} />
      <AntMenu
        mode="inline"
        defaultSelectedKeys={['0']}
        onClick={handleMenuClick}
        theme="dark"
        selectedKeys={[location.pathname + location.search]}
        items={items}
        className={styles.antMenu}
      />
    </Sider>
  );
};
