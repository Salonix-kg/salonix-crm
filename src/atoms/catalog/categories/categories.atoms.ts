import {atom} from 'jotai';

export type CategoryItem = {
  id: number;
  title: string;
  /**
   * @type duration
   * @description в минутах
   */
  duration: number;
  price: number;
};

export type Category = {
  label: string;
  key: string;
  children: CategoryItem[];
};

export const categoriesAtom = atom<Category[]>([
  {
    label: `Hair & styling`,
    key: '1',
    children: [
      {
        title: 'Стрижка',
        price: 500,
        duration: 45,
        id: 1,
      },
      {
        title: 'Цвет волос',
        price: 400,
        duration: 45,
        id: 2,
      },
      {
        title: 'Укладка волос феном',
        price: 200,
        duration: 45,
        id: 3,
      },
    ],
  },
  {
    label: `Массаж`,
    key: '2',
    children: [
      {
        title: 'Стрижка',
        price: 500,
        duration: 45,
        id: 4,
      },
      {
        title: 'Цвет волос',
        price: 400,
        duration: 45,
        id: 5,
      },
      {
        title: 'Укладка волос феном',
        price: 200,
        duration: 45,
        id: 6,
      },
    ],
  },
]);
