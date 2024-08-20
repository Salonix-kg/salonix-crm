import {IconContext} from 'react-icons';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'jotai';

import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import {AppRoute} from '@routes/appRoute';

import {themeConfig} from '@styles/theme.config.ts';

export const App = () => {
  return (
    <ConfigProvider theme={themeConfig} locale={ruRU}>
      <IconContext.Provider value={{size: '18px'}}>
        <BrowserRouter>
          <Provider>
            <AppRoute />
          </Provider>
        </BrowserRouter>
      </IconContext.Provider>
    </ConfigProvider>
  );
};
