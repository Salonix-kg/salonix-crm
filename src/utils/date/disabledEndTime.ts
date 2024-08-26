import {Dayjs} from 'dayjs';

export const disabledEndTime = (startTime: Dayjs | null) => () => ({
  disabledHours: () =>
    [...Array(24).keys()].filter(hour => startTime && startTime.hour() > hour),
  disabledMinutes: (selectedHour: number) => {
    if (startTime && selectedHour === startTime.hour()) {
      return [...Array(60).keys()].filter(
        minute => startTime.minute() >= minute,
      );
    }
    return [];
  },
});
