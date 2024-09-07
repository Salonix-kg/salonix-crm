import {useCallback, useMemo} from 'react';
import {useSetAtom} from 'jotai';
import {useAtomValue} from 'jotai/index';

import {Avatar, Flex, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';

import {Button} from '@components/Button';
import {ContentPadding} from '@components/ContentPadding';
import {Table} from '@components/Table';

import {isMemberDrawerOpenAtom, selectedMemberAtom} from '@atoms/team/member';
import {Member, membersAtom} from '@atoms/team/members';

import {phoneNumberFormatter} from '@utils/phoneNumberFormatter.ts';

import {theme} from '@styles/theme.ts';

import styles from '../Team.module.scss';

export const MembersTable = () => {
  const members = useAtomValue(membersAtom);

  const setMemberDrawerOpen = useSetAtom(isMemberDrawerOpenAtom);
  const setSelectedMember = useSetAtom(selectedMemberAtom);
  const setIsMemberDrawerOpen = useSetAtom(isMemberDrawerOpenAtom);

  const handleEditClick = useCallback(
    (member: Member) => () => {
      setSelectedMember(member);
      setIsMemberDrawerOpen(true);
    },
    [setIsMemberDrawerOpen, setSelectedMember],
  );

  const columns: ColumnsType<Member> = useMemo(
    () => [
      {
        title: 'Фото',
        dataIndex: 'avatar',
        render: (value: string) => <Avatar src={value} shape="square" />,
        align: 'center',
      },
      {
        title: 'Имя',
        dataIndex: 'fullName',
      },
      {
        title: 'Номер телефона',
        dataIndex: 'phoneNumber',
        align: 'center',
        render: value => phoneNumberFormatter(value),
      },
      {
        title: 'Отзывы',
        dataIndex: 'rate',
        align: 'center',
        render: value => value || 'Пока нет',
      },
      {
        align: 'center',
        render: (_, member) => (
          <Button type="primary" onClick={handleEditClick(member)}>
            Редактировать
          </Button>
        ),
      },
    ],
    [handleEditClick],
  );

  const handleAddClick = useCallback(() => {
    setMemberDrawerOpen(true);
  }, [setMemberDrawerOpen]);

  return (
    <ContentPadding>
      <Flex className={styles.header} justify="space-between" align="center">
        <Typography.Title className={styles.title} level={5}>
          Члены команды
        </Typography.Title>
        <Button type="primary" bg={theme.black} onClick={handleAddClick}>
          Добавить
        </Button>
      </Flex>
      <Table<Member>
        dataSource={members}
        rowKey={record => record.id}
        className={styles.table}
        columns={columns}
        scroll={{x: 'max-content'}}
        pagination={false}
      />
    </ContentPadding>
  );
};
