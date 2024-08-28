import {BlockedTimeDrawer} from './BlockedTimeDrawer';
import {Calendar} from './Calendar';
import {OrderDrawer} from './OrderDrawer';

export const WorkCalendar = () => {
  return (
    <>
      <Calendar />
      <BlockedTimeDrawer />
      <OrderDrawer />
    </>
  );
};
