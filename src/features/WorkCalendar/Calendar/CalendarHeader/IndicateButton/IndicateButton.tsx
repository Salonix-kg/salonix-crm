import {FaFeatherPointed} from 'react-icons/fa6';
import {PiCalendarHeartFill} from 'react-icons/pi';
import {TbLockFilled} from 'react-icons/tb';

import {Button, Dropdown, MenuProps} from 'antd';

import {useResponsive} from '@hooks/useResponsive.ts';

import styles from './IndicateButton.module.scss';

const items: MenuProps['items'] = [
  {
    label: 'Новый визит',
    key: 'visit',
    icon: <PiCalendarHeartFill size={20} />,
  },
  {
    label: 'Заблокированное время',
    key: '1',
    icon: <TbLockFilled />,
  },
];

export const IndicateButton = () => {
  const {isMobile} = useResponsive();

  return (
    !isMobile && (
      <Dropdown menu={{items}} trigger={['click']}>
        <Button
          block
          className={styles.triggerButton}
          icon={<FaFeatherPointed size={12} />}
          iconPosition="end"
          type="primary">
          Указать
        </Button>
      </Dropdown>
    )
  );
};
