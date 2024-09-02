import {Navigate} from 'react-router-dom';

import {Home} from '@features/Home';
import {Login} from '@features/Login';
import {Profile} from '@features/Profile';
import {WorkCalendar} from '@features/WorkCalendar';

import {ROUTE_PATHS} from '@routes/routes.types.ts';

export const AUTH_ROUTES = [
  {
    path: ROUTE_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export const ROUTES = [
  {
    path: ROUTE_PATHS.HOME,
    element: <Home />,
  },
  {
    path: ROUTE_PATHS.WORK_CALENDAR,
    element: <WorkCalendar />,
  },
  {
    path: ROUTE_PATHS.PROFILE,
    element: <Profile />,
    withoutLayout: false,
  },
];
