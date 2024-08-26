import {atom} from 'jotai';
import {DefaultOptionType} from 'rc-select/lib/Select';

export type Master = {
  id: string;
  title: string;
  businessHours: {
    startTime: string;
    endTime: string;
  };
};

export const mastersAtom = atom<Master[]>([
  {
    id: '1',
    title: 'Айтурган',
    businessHours: {startTime: '10:00', endTime: '20:00'},
  },
  {
    id: '2',
    title: 'Бегай',
    businessHours: {startTime: '10:00', endTime: '20:00'},
  },
  {
    id: '3',
    title: 'Сезим',
    businessHours: {startTime: '10:00', endTime: '20:00'},
  },
]);

export const mastersAsOptionsAtom = atom<DefaultOptionType[]>(get =>
  get(mastersAtom).map(master => ({label: master.title, value: master.id})),
);
