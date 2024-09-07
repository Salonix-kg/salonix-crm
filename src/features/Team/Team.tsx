import {ReactNode, useMemo} from 'react';
import {ContentMenu, ContentMenuItem} from 'components/ContentMenu';

import {MemberDrawer} from './MembersTable/MemberDrawer';
import {MembersTable} from './MembersTable';
import {WorkSchedule} from './WorkSchedule';

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
  const menuContent: Record<MenuValue, ReactNode> = useMemo(
    () => ({
      members: <MembersTable />,
      'work-schedule': <WorkSchedule />,
    }),
    [],
  );

  return (
    <>
      <ContentMenu<MenuValue> content={menuContent} items={menuItems} />
      <MemberDrawer />
    </>
  );
};
