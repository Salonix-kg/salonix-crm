import {IconContext} from 'react-icons';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import dayjs from 'dayjs';
import {Provider} from 'jotai';

import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import {store} from '@atoms/store.ts';

import {AppRoute} from '@routes/appRoute';

import {themeConfig} from '@styles/theme.config.ts';

import 'dayjs/locale/ru.js';

import 'react-toastify/dist/ReactToastify.css';

dayjs.locale('ru');

export const App = () => {
  return (
    <ConfigProvider theme={themeConfig} locale={ruRU}>
      <IconContext.Provider value={{size: '18px'}}>
        <BrowserRouter>
          <Provider store={store}>
            <ToastContainer />
            <AppRoute />
          </Provider>
        </BrowserRouter>
      </IconContext.Provider>
    </ConfigProvider>
  );
};
