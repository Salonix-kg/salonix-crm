import dayjs from 'dayjs';
import {atomWithReset} from 'jotai/utils';

import {BlockedTimeSchema} from '@features/WorkCalendar/BlockedTimeDrawer';

export type BlockedTimeForm = Partial<BlockedTimeSchema> & {
  id?: number;
};

export const blockedTimeFormAtom = atomWithReset<BlockedTimeForm>({
  date: dayjs(),
});
