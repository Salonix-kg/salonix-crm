import {Route, Routes} from 'react-router-dom';

import {AppLayout} from '@components/AppLayout';

import {AUTH_ROUTES, ROUTES} from './routes';

const isAuth = true;

export const AppRoute = () => {
  if (!isAuth) {
    return (
      <Routes>
        {AUTH_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.Component}></Route>
        ))}
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        {ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.Component}></Route>
        ))}
      </Routes>
    </AppLayout>
  );
};
