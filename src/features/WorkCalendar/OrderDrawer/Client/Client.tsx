import {useCallback} from 'react';
import {IoPersonAddOutline} from 'react-icons/io5';
import {useAtom, useSetAtom} from 'jotai';

import {Typography} from 'antd';

import {ClientCard} from '@components/ClientCard';

import {isAddClientDrawerOpenAtom, orderFormAtom} from '@atoms/calendar/order';

export const Client = () => {
  const setIsAddClientDrawerOpen = useSetAtom(isAddClientDrawerOpenAtom);
  const [{client}] = useAtom(orderFormAtom);

  const handleClick = useCallback(() => {
    setIsAddClientDrawerOpen(true);
  }, [setIsAddClientDrawerOpen]);

  return (
    <div>
      <Typography.Title level={5}>Клиент</Typography.Title>
      {client ? (
        <ClientCard
          title={client.fullName}
          phoneNumber={client.phoneNumber}
          onClick={handleClick}
        />
      ) : (
        <ClientCard
          title="Добавить клиента"
          icon={<IoPersonAddOutline size={24} />}
          onClick={handleClick}
        />
      )}
    </div>
  );
};
