import {ThemeConfig} from 'antd';
import {AliasToken} from 'antd/es/theme/interface';

const token: Partial<AliasToken> = {
  colorPrimary: '#6950F3',
};

export const themeConfig: ThemeConfig = {
  token,
  components: {
    Segmented: {},
  },
};
