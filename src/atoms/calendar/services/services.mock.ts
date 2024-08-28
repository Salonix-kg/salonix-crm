import {Service} from './services.atoms';

export const servicesMock: Service[] = [
  {
    id: 1,
    title: 'Мужская стрижка',
    duration: 45,
    price: 1500,
    category: {id: 1, title: 'Стрижка'},
    mastersId: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Женская стрижка',
    duration: 60,
    price: 2000,
    category: {id: 1, title: 'Стрижка'},
    mastersId: [1],
  },
  {
    id: 3,
    title: 'Маникюр с покрытием',
    duration: 90,
    price: 2500,
    category: {id: 2, title: 'Маникюр'},
    mastersId: [2, 3],
  },
  {
    id: 4,
    title: 'Педикюр с покрытием',
    duration: 120,
    price: 3000,
    category: {id: 3, title: 'Педикюр'},
    mastersId: [1, 3],
  },
  {
    id: 5,
    title: 'Укладка волос',
    duration: 40,
    price: 1800,
    category: {id: 4, title: 'Укладка'},
    mastersId: [1, 2],
  },
  {
    id: 6,
    title: 'Окрашивание волос',
    duration: 150,
    price: 5000,
    category: {id: 5, title: 'Окрашивание'},
    mastersId: [1, 2],
  },
];
