import {User} from './user.atoms.ts';

export const users: User[] = [
  {
    id: 1,
    email: 'admin@admin.com',
    fullName: 'Джон Ким',
    phoneNumber: '+996700123456',
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: null,
    role: 'ADMIN',
  },
  {
    id: 2,
    email: 'manager@example.com',
    fullName: 'Айгүл Токтогулова',
    phoneNumber: '+996700654321',
    createdAt: '2024-08-02T11:30:00Z',
    updatedAt: null,
    role: 'MANAGER',
  },
  {
    id: 3,
    email: 'master@example.com',
    fullName: 'Бекзат Таалайбеков',
    phoneNumber: '+996700987654',
    createdAt: '2024-08-03T09:15:00Z',
    updatedAt: '2024-08-05T08:45:00Z',
    role: 'MASTER',
  },
  {
    id: 4,
    email: 'accountant@example.com',
    fullName: 'Каныкей Керимова',
    phoneNumber: '+996700321987',
    createdAt: '2024-08-04T14:20:00Z',
    updatedAt: null,
    role: 'ACCOUNTANT',
  },
];
