import {useMemo} from 'react';
import {PiCalendarHeartFill} from 'react-icons/pi';
import {TbLockFilled} from 'react-icons/tb';

import {Dropdown, MenuProps} from 'antd';

import {HoveredBlockData} from '@hooks/useCalendar.ts';

import styles from './HoveredBlock.module.scss';

export type HoveredBlockProps = {
  hoveredBlockData: HoveredBlockData;
  isIndicateDropdownOpen: boolean;
  setIsIndicateDropdownOpen: (isOpen: boolean) => void;
  onAddBlockedTime: () => void;
  onAddNewVisit: () => void;
};

export const HoveredBlock = ({
  hoveredBlockData,
  isIndicateDropdownOpen,
  onAddBlockedTime,
  onAddNewVisit,
}: HoveredBlockProps) => {
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Новый визит',
        key: 'visit',
        icon: <PiCalendarHeartFill size={20} />,
        onClick: onAddNewVisit,
      },
      {
        label: 'Заблокированное время',
        key: 'blockedTime',
        icon: <TbLockFilled />,
        onClick: onAddBlockedTime,
      },
    ],
    [onAddBlockedTime, onAddNewVisit],
  );

  return (
    <Dropdown open={isIndicateDropdownOpen} menu={{items}} trigger={['click']}>
      <div style={{...hoveredBlockData.style}} className={styles.hoveredBlock}>
        {hoveredBlockData.data.time.split(':').slice(0, 2).join(' : ')}
      </div>
    </Dropdown>
  );
};
