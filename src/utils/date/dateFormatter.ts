import dayjs, {Dayjs} from 'dayjs';

export const humanReadableDateFormat = 'DD.MM.YYYY HH:mm';

export const dateFormat = 'DD.MM.YYYY';

export const calendarFormat = 'YYYY-MM-DD';

export const serverReturnedDateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';

export type DateFormatterParams = {
  date: Date | string | Dayjs;
  parseFormat?: string;
  format?: string;
};

export const dateFormatter = ({
  date,
  parseFormat = serverReturnedDateFormat,
  format = humanReadableDateFormat,
}: DateFormatterParams) => {
  const ISODate = dayjs(date, {
    format: parseFormat,
  }).toISOString();

  return dayjs(ISODate).format(format);
};
