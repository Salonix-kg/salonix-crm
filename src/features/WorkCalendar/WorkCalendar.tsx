import {BlockedTimeDrawer} from '@features/WorkCalendar/BlockedTimeDrawer';

import {Calendar} from './Calendar';

export const WorkCalendar = () => {
  return (
    <>
      <Calendar />
      <BlockedTimeDrawer />
    </>
  );
};
