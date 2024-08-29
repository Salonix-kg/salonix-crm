import {atom} from 'jotai';

export type CategoryItem = {
  label: string;
  sum: number;
  time: string;
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
        label: 'Стрижка',
        sum: 500,
        time: '45min',
      },
      {
        label: 'Цвет волос',
        sum: 400,
        time: '45min',
      },
      {
        label: 'Укладка волос феном',
        sum: 200,
        time: '45min',
      },
    ],
  },
  {
    label: `Массаж`,
    key: '2',
    children: [
      {
        label: 'Стрижка',
        sum: 500,
        time: '45min',
      },
      {
        label: 'Цвет волос',
        sum: 400,
        time: '45min',
      },
      {
        label: 'Укладка волос феном',
        sum: 200,
        time: '45min',
      },
    ],
  },
]);
