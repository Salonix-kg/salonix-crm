import {RouterProvider} from 'react-router-dom';

import {AUTH_ROUTES, ROUTES} from './routes';

export const AppRoute = () => {
  const isAuth = true;

  return <RouterProvider router={isAuth ? ROUTES : AUTH_ROUTES} />;
};
