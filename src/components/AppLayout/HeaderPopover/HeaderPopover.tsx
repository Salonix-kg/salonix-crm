import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAtomValue} from 'jotai/index';

import {Avatar, Flex, Menu, MenuProps, Typography} from 'antd';

import {CardPopover} from '@components/CardPopover';

import {userAtom} from '@atoms/auth';

import {ROUTE_URLS} from '@routes/routes.types.ts';

import {getInitials} from '@utils/getInitials.ts';

import styles from './HeaderPopover.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

export const HeaderPopover = () => {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);

  const handleProfileClick = useCallback(() => {
    navigate(ROUTE_URLS.PROFILE());
  }, [navigate]);

  const menu: MenuItem[] = useMemo(
    () => [
      {
        label: 'Профиль / Настройки',
        key: 'profile',
        onClick: handleProfileClick,
      },
      {
        label: 'Техподдержка',
        key: 'support',
      },
      {
        label: 'Выйти',
        key: 'logout',
        danger: true,
      },
    ],
    [handleProfileClick],
  );

  return (
    <CardPopover
      footer={
        <>
          <Flex justify="space-between" align="center">
            <Typography.Title className={styles.title} level={5}>
              {user!.fullName}
            </Typography.Title>
            <Avatar size={40} icon={getInitials(user!.fullName)} />
          </Flex>
          <Menu selectedKeys={[]} className={styles.menu} items={menu} />
        </>
      }
      holder={<Avatar size={40} icon={getInitials(user!.fullName)} />}
    />
  );
};
