import {Member} from './members.atoms.ts';

export const membersMock: Member[] = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    fullName: 'Айбек Ахматов',
    phoneNumber: '+996700123456',
    email: 'aibek.akhmatov@example.com',
    birthDate: '15.02.1990',
    position: 'Парикмахер',
    commission: 20,
    experience: 8,
    servicesId: [1, 2, 4],
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    fullName: 'Алина Исмаилова',
    phoneNumber: '+996701654321',
    email: 'alina.ismailova@example.com',
    birthDate: '22.06.1987',
    position: 'Мастер маникюра',
    commission: 15,
    experience: 10,
    servicesId: [4, 5],
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    fullName: 'Бекболот Эркинбаев',
    phoneNumber: '+996702987654',
    email: 'bekbolot.erkinbaev@example.com',
    birthDate: '30.07.1992',
    position: 'Барбер',
    commission: 25,
    experience: 5,
    servicesId: [2, 3, 6],
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    fullName: 'Жайнагуль Токтосунова',
    phoneNumber: '+996703112233',
    email: 'zhainagul.toktosunova@example.com',
    birthDate: '12.11.1988',
    position: 'Массажист',
    commission: 18,
    experience: 7,
    servicesId: [1, 3],
  },
];
