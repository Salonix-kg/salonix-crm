import {MasterSchedule} from './workSchedule.atoms.ts';

export const workScheduleMock: MasterSchedule[] = [
  {
    masterId: 1,
    fullName: 'Aibek Tursunov',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    week: {
      monday: {
        date: '2024-09-02',
        startTime: '09:00',
        endTime: '18:00',
        hours: 9,
      },
      tuesday: {
        date: '2024-09-03',
        startTime: '09:00',
        endTime: '18:00',
        hours: 9,
      },
      wednesday: {
        date: '2024-09-04',
        startTime: '09:00',
        endTime: '18:00',
        hours: 9,
      },
      thursday: {
        date: '2024-09-05',
        startTime: '09:00',
        endTime: '18:00',
        hours: 9,
      },
      friday: {
        date: '2024-09-06',
        startTime: '09:00',
        endTime: '18:00',
        hours: 9,
      },
      saturday: {
        date: '2024-09-07',
        startTime: '10:00',
        endTime: '16:00',
        hours: 6,
      },
      sunday: {
        date: '2024-09-08',
        startTime: '11:00',
        endTime: '15:00',
        hours: 4,
      },
    },
  },
  {
    masterId: 2,
    fullName: 'Nazgul Aitmatova',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    week: {
      monday: {
        date: '2024-09-02',
        startTime: '08:00',
        endTime: '17:00',
        hours: 9,
      },
      tuesday: {
        date: '2024-09-03',
        startTime: '08:00',
        endTime: '17:00',
        hours: 9,
      },
      wednesday: {
        date: '2024-09-04',
        startTime: '08:00',
        endTime: '17:00',
        hours: 9,
      },
      thursday: {
        date: '2024-09-05',
        startTime: '08:00',
        endTime: '17:00',
        hours: 9,
      },
      friday: null,
      saturday: null,
      sunday: null,
    },
  },
  {
    masterId: 3,
    fullName: 'Emilbek Mambetov',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    week: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: {
        date: '2024-09-07',
        startTime: '10:00',
        endTime: '14:00',
        hours: 4,
      },
      sunday: {
        date: '2024-09-08',
        startTime: '11:00',
        endTime: '15:00',
        hours: 4,
      },
    },
  },
];
