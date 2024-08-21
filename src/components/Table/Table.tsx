import classNames from 'classnames';

import {TableProps} from 'antd';
import {Table as AntTable} from 'antd';
import {AnyObject} from 'antd/es/_util/type';

import styles from './Table.module.scss';

export const Table = <RecordType extends AnyObject = AnyObject>(
  props: TableProps<RecordType>,
) => {
  return (
    <AntTable<RecordType>
      {...props}
      className={classNames(styles.table, props.className)}
    />
  );
};
