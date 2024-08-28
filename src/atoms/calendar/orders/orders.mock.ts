import {Order} from '@atoms/calendar/orders/orders.atoms.ts';

export const ordersMock: Order[] = [
  {
    id: 1,
    date: '2024-08-27',
    startTime: '09:00',
    endTime: '10:30',
    status: 'booked',
    services: [
      {
        id: 1,
        title: 'Маникюр',
        duration: 60,
        price: 500,
        category: {
          id: 1,
          title: 'Услуги для ногтей',
        },
      },
    ],
    master: {
      id: 1,
      fullName: 'Айтурган',
    },
    client: {
      id: 1,
      fullName: 'Ольга Смирнова',
      phoneNumber: '+7 123 456-78-90',
    },
  },
  {
    id: 2,
    date: '2024-08-27',
    startTime: '11:00',
    endTime: '12:00',
    status: 'pending',
    services: [
      {
        id: 302,
        title: 'Стрижка',
        duration: 45,
        price: 300,
        category: {
          id: 2,
          title: 'Услуги для волос',
        },
      },
    ],
    master: {
      id: 2,
      fullName: 'Бегай',
    },
    client: {
      id: 2,
      fullName: 'Сергей Васильев',
      phoneNumber: '+7 987 654-32-10',
    },
  },
  {
    id: 3,
    date: '2024-08-27',
    startTime: '13:00',
    endTime: '14:30',
    status: 'completed',
    services: [
      {
        id: 303,
        title: 'Окрашивание',
        duration: 90,
        price: 1500,
        category: {
          id: 2,
          title: 'Услуги для волос',
        },
      },
    ],
    master: {
      id: 3,
      fullName: 'Сезим',
    },
    client: {
      id: 3,
      fullName: 'Елена Иванова',
      phoneNumber: '+7 321 654-98-76',
    },
  },
  {
    id: 4,
    date: '2024-08-27',
    startTime: '15:00',
    endTime: '16:00',
    status: 'completed',
    services: [
      {
        id: 304,
        title: 'Ультразвуковая чистка лица',
        duration: 30,
        price: 400,
        category: {
          id: 3,
          title: 'Косметология',
        },
      },
    ],
    master: {
      id: 1,
      fullName: 'Айтурган',
    },
    client: {
      id: 4,
      fullName: 'Мария Морозова',
      phoneNumber: '+7 456 789-01-23',
    },
  },
];
