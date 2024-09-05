import {ReactNode, useCallback, useState} from 'react';
import {FaChevronLeft} from 'react-icons/fa';
import classNames from 'classnames';
import {MenuInfo} from 'rc-menu/lib/interface';

import {Flex, Menu} from 'antd';

import {useResponsive} from '@hooks/useResponsive.ts';

import styles from './ContentMenu.module.scss';

export type ContentMenuItem<Value> = {
  label: string;
  key: Value;
};

export type MenuContent<Value extends string> = Record<Value, ReactNode>;

export type ContentMenuProps<Value extends string> = {
  items: ContentMenuItem<Value>[];
  content: MenuContent<Value>;
  activeKey?: Value;
};

export const ContentMenu = <Value extends string>({
  items,
  activeKey,
  content,
}: ContentMenuProps<Value>) => {
  const [active, setActive] = useState(activeKey || items[0].key);
  const [isOpen, setIsOpen] = useState(true);
  const {isDesktop} = useResponsive();

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleClick = useCallback(
    (info: MenuInfo) => {
      setActive(info.key as Value);
      if (!isDesktop && isOpen) {
        setIsOpen(false);
      }
    },
    [isDesktop, isOpen],
  );

  return (
    <Flex className={styles.container}>
      <div className={classNames(styles.menu, {[styles.closedMenu]: !isOpen})}>
        {isOpen && (
          <Menu
            className={styles.menuItems}
            selectedKeys={[active]}
            onClick={handleClick}
            items={items}
          />
        )}
        <div
          className={classNames(styles.toggle, {
            [styles.closedToggle]: !isOpen,
          })}
          onClick={handleToggle}>
          <FaChevronLeft size={12} />
        </div>
      </div>
      <div className={styles.content}>{content[active]}</div>
    </Flex>
  );
};
