import {BlockedTime} from '@atoms/calendar/blockedTime';

export type BlockedTimeEvent = {
  resourceId: string;
  title: string;
  start: string;
  end: string;
  bookedTime: BlockedTime;
};

export const blockedTimeToEvent = (
  blockedTime: BlockedTime[],
): BlockedTimeEvent[] => {
  return blockedTime.map(item => ({
    resourceId: String(item.masterId),
    title: item.title,
    start: `${item.date} ${item.startTime}`,
    end: `${item.date} ${item.endTime}`,
    bookedTime: item,
  }));
};
