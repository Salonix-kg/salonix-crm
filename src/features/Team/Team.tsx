import {useCallback} from 'react';
import {useSetAtom} from 'jotai';

import {Flex, Typography} from 'antd';

import {MemberDrawer} from '@features/Team/MemberDrawer';

import {Button} from '@components/Button';
import {ContentPadding} from '@components/ContentPadding';

import {isMemberDrawerOpenAtom} from '@atoms/team/member';

import {theme} from '@styles/theme.ts';

import {MembersTable} from './MembersTable';

import styles from './Team.module.scss';

export const Team = () => {
  const setMemberDrawerOpen = useSetAtom(isMemberDrawerOpenAtom);

  const handleAddClick = useCallback(() => {
    setMemberDrawerOpen(true);
  }, [setMemberDrawerOpen]);

  return (
    <>
      <ContentPadding>
        <Flex className={styles.header} justify="space-between" align="center">
          <Typography.Title className={styles.title} level={5}>
            Члены команды
          </Typography.Title>
          <Button type="primary" bg={theme.black} onClick={handleAddClick}>
            Добавить
          </Button>
        </Flex>
        <MembersTable />
      </ContentPadding>
      <MemberDrawer />
    </>
  );
};
