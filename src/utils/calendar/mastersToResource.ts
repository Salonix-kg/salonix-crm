import {Master} from '@atoms/calendar/masters';

export const mastersToResource = (masters: Master[]) => {
  return masters.map((master: Master) => ({
    ...master,
    id: master.id.toString(),
    title: master.fullName,
  }));
};
