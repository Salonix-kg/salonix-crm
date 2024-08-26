import {atom} from 'jotai/index';

import {BlockedTime, blockedTimesAtom} from './blockedTimes.atoms.ts';

export type AddBlockedTimeData = Omit<BlockedTime, 'id'> & {
  id?: number;
};

export const addBlockedTimeAtom = atom(
  null,
  (get, set, data: AddBlockedTimeData) => {
    let blockedTimes = get(blockedTimesAtom);

    if (data.id) {
      blockedTimes = blockedTimes.filter(
        blockedTime => blockedTime.id !== data.id,
      );
    }

    blockedTimes.push({...data, id: data.id || Math.random()});

    set(blockedTimesAtom, [...blockedTimes]);
  },
);
