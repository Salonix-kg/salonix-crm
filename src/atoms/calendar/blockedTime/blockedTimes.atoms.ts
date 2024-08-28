import {atom} from 'jotai';

export type BlockedTime = {
  id: number;
  masterId: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
};

export const blockedTimesAtom = atom<BlockedTime[]>([
  {
    id: 1,
    masterId: 1,
    title: 'Обеденный перерыв',
    date: '2024-08-27',
    startTime: '14:00',
    endTime: '14:30',
    description: 'Перерыв на обед',
  },
  {
    id: 2,
    masterId: 2,
    title: 'Медицинская справка',
    date: '2024-08-27',
    startTime: '15:00',
    endTime: '15:30',
    description: 'Посещение врача для получения медицинской справки',
  },
]);
