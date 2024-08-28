import {ChangeEventHandler, useCallback, useMemo, useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {MdAdd} from 'react-icons/md';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Divider, Drawer, Empty} from 'antd';

import {ClientCard} from '@components/ClientCard';
import {TextInput} from '@components/TextInput';

import {Client, clientsAtom} from '@atoms/calendar/clients';
import {
  isAddClientDrawerOpenAtom,
  setOrderClientAtom,
} from '@atoms/calendar/order';

import {theme} from '@styles/theme.ts';

export const AddClientDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isAddClientDrawerOpenAtom);
  const clients = useAtomValue(clientsAtom);

  const setOrderClient = useSetAtom(setOrderClientAtom);

  const [searchText, setSearchText] = useState('');

  const filteredClients = useMemo(
    () =>
      clients.filter(({fullName, phoneNumber}) =>
        `${fullName} ${phoneNumber}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
    [clients, searchText],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      setSearchText(e.target.value);
    }, []);

  const handleClientClick = useCallback(
    (client: Client | null) => () => {
      setOrderClient(client);
      setIsOpen(false);
    },
    [setIsOpen, setOrderClient],
  );

  return (
    <Drawer
      width={520}
      styles={{header: {backgroundColor: theme['primary-blur']}}}
      onClose={handleClose}
      open={isOpen}>
      <TextInput
        value={searchText}
        onChange={handleSearchTextChange}
        prefix={<BiSearch />}
        placeholder="Поиск клиента"
        size="large"
      />
      <Divider />
      <ClientCard icon={<MdAdd size={24} />} title="Добавить нового клиента" />
      <ClientCard
        icon={<AiOutlineUser size={24} />}
        title="Без предварительной записи"
        onClick={handleClientClick(null)}
      />
      <Divider />
      {filteredClients.length ? (
        filteredClients.map(client => (
          <ClientCard
            key={client.id}
            title={client.fullName}
            phoneNumber={client.phoneNumber}
            onClick={handleClientClick(client)}
          />
        ))
      ) : (
        <Empty
          image={<BiSearch color={theme['primary-color']} size={60} />}
          description="Клиенты не найдены"
        />
      )}
    </Drawer>
  );
};
