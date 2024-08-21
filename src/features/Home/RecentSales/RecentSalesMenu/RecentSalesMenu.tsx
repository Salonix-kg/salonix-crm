import {DefaultOptionType} from 'rc-select/lib/Select';

import {CardPopover} from '@components/CardPopover';
import {Select} from '@components/Select';

const timePeriods: DefaultOptionType[] = [
  {
    label: 'Последние 7 дней',
    value: '7',
  },
  {
    label: 'Последние 30 дней',
    value: '30',
  },
];

export const RecentSalesMenu = () => {
  return (
    <CardPopover
      content={
        <Select
          size="large"
          label="Временной период"
          value="7"
          options={timePeriods}
        />
      }
    />
  );
};
