import {ReactNode, useCallback, useMemo} from 'react';
import {ContentMenu, ContentMenuItem} from 'components/ContentMenu';
import {useSetAtom} from 'jotai';

import {Flex, Typography} from 'antd';

import {MemberDrawer} from '@features/Team/MemberDrawer';

import {Button} from '@components/Button';
import {ContentPadding} from '@components/ContentPadding';

import {isMemberDrawerOpenAtom} from '@atoms/team/member';

import {theme} from '@styles/theme.ts';

import {MembersTable} from './MembersTable';

import styles from './Team.module.scss';

export type MenuValue = 'members' | 'work-schedule';

const menuItems: ContentMenuItem<MenuValue>[] = [
  {
    label: 'Члены команды',
    key: 'members',
  },
  {
    label: 'График работы',
    key: 'work-schedule',
  },
];

export const Team = () => {
  const setMemberDrawerOpen = useSetAtom(isMemberDrawerOpenAtom);

  const handleAddClick = useCallback(() => {
    setMemberDrawerOpen(true);
  }, [setMemberDrawerOpen]);

  const menuContent: Record<MenuValue, ReactNode> = useMemo(
    () => ({
      members: (
        <ContentPadding>
          <Flex
            className={styles.header}
            justify="space-between"
            align="center">
            <Typography.Title className={styles.title} level={5}>
              Члены команды
            </Typography.Title>
            <Button type="primary" bg={theme.black} onClick={handleAddClick}>
              Добавить
            </Button>
          </Flex>
          <MembersTable />
        </ContentPadding>
      ),
      'work-schedule': 'WOrk',
    }),
    [handleAddClick],
  );

  return (
    <>
      <ContentMenu<MenuValue> content={menuContent} items={menuItems} />
      <MemberDrawer />
    </>
  );
};
