import {Route, Routes} from 'react-router-dom';
import {useAtomValue} from 'jotai';

import {AppLayout} from '@components/AppLayout';

import {isAuthAtom} from '@atoms/auth';

import {AUTH_ROUTES, ROUTES} from './routes';

export const AppRoute = () => {
  const isAuth = useAtomValue(isAuthAtom);

  if (!isAuth) {
    return (
      <Routes>
        {AUTH_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}></Route>
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
            element={route.element}></Route>
        ))}
      </Routes>
    </AppLayout>
  );
};
