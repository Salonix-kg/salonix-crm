import {atom} from 'jotai';
import {DefaultOptionType} from 'rc-select/lib/Select';

export type Master = {
  id: number;
  fullName: string;
  businessHours: {
    startTime: string;
    endTime: string;
  };
};

export const mastersAtom = atom<Master[]>([
  {
    id: 1,
    fullName: 'Айтурган',
    businessHours: {startTime: '08:00', endTime: '20:00'},
  },
  {
    id: 2,
    fullName: 'Бегай',
    businessHours: {startTime: '08:00', endTime: '20:00'},
  },
  {
    id: 3,
    fullName: 'Сезим',
    businessHours: {startTime: '08:00', endTime: '20:00'},
  },
]);

export const mastersAsOptionsAtom = atom<DefaultOptionType[]>(get =>
  get(mastersAtom).map(master => ({label: master.fullName, value: master.id})),
);
