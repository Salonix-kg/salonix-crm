import {atom} from 'jotai';

import {workScheduleMock} from '@atoms/team/workSchedule/workSchedule.mock.ts';

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WorkDay = {
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
};

export type MasterSchedule = {
  masterId: number;
  fullName: string;
  avatar?: string;
  week: Record<WeekDay, WorkDay | null>;
};

export const workScheduleAtom = atom<MasterSchedule[]>(workScheduleMock);
