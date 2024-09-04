import {Service} from './services.atoms.ts';

export const services: Service[] = [
  {
    id: 1,
    title: 'Стрижка',
    duration: 45,
    price: 3000,
    category: {
      id: 1,
      title: 'Парикмахерские услуги',
    },
  },
  {
    id: 2,
    title: 'Маникюр',
    duration: 60,
    price: 2500,
    category: {
      id: 2,
      title: 'Уход за ногтями',
    },
  },
  {
    id: 3,
    title: 'Окрашивание волос',
    duration: 120,
    price: 8000,
    category: {
      id: 1,
      title: 'Парикмахерские услуги',
    },
  },
  {
    id: 4,
    title: 'Массаж лица',
    duration: 30,
    price: 3500,
    category: {
      id: 3,
      title: 'Косметологические услуги',
    },
  },
  {
    id: 5,
    title: 'Педикюр',
    duration: 75,
    price: 3000,
    category: {
      id: 2,
      title: 'Уход за ногтями',
    },
  },
];
