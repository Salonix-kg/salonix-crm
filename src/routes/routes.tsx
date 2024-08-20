import {Home} from '@features/Home';
import {Login} from '@features/Login';
import {WorkCalendar} from '@features/WorkCalendar';

import {ROUTE_PATHS} from '@routes/routes.types.ts';

export const AUTH_ROUTES = [
  {
    path: ROUTE_PATHS.LOGIN,
    Component: <Login />,
  },
  {
    path: '*',
    element: <Login />,
  },
];

export const ROUTES = [
  {
    path: ROUTE_PATHS.HOME,
    Component: <Home />,
  },
  {
    path: ROUTE_PATHS.WORK_CALENDAR,
    Component: <WorkCalendar />,
  },
];
