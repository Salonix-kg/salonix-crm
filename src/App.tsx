import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import {AppRoute} from '@routes/appRoute';

import {themeConfig} from '@styles/theme.config.ts';

export const App = () => {
  return (
    <ConfigProvider theme={themeConfig} locale={ruRU}>
      <AppRoute />
    </ConfigProvider>
  );
};
