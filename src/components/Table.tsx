/* eslint-disable no-nested-ternary */
import { Column } from '../types';
import TableRow from './TableRow';
import '../assets/styles/components/table.less';
import Button from './Button';
import ApiClient from '../library/ApiClient';
import AddToast from '../library/Toast';

interface TableProps<T> {
  data?: any
  columns?: Column[]
  is_router_link?: boolean
  router_builder?: string
  urlRemove?:string
  buttonFunc?: Function
  scopedSlotsRenderFunc?: (item: T, column: Column) => JSX.Element | undefined
}

function Table<T>(props: TableProps<T>) {
  const getValueByKey = (key: string, item: any) => {
    let value;
    if (key.includes('.')) {
      const keys = key.split('.');
      let inv: any = null;
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (index === 0) {
          inv = item[key];
        } else {
          inv = inv[key];
        }
      }
      value = inv;
    } else {
      value = item[key];
    }
    return value;
  };

  const routerLink = (item: any) => {
    if (!props.is_router_link) return;
    if (!props.router_builder) return;
    const text = item.id ? item.id : item.uid;
    const routerBuilder = `${props.router_builder}/${text}`;

    return routerBuilder;
  };

  const changeISOTimeToMyFormTime = (time: string) => {
    const date = new Date(time).getDate() < 10 ? `0${new Date(time).getDate()}` : `${new Date(time).getDate()}`;
  const month = new Date(time).getMonth() + 1 < 10 ? `0${new Date(time).getMonth() + 1}` : `${new Date(time).getMonth() + 1}`;
  return `${new Date(time).getFullYear()}-${month}-${date}`;
  };

  const handleRemove = async (e: any, row: any, index: number) => {
    try {
      e.preventDefault();
      if (props.urlRemove) {
        // eslint-disable-next-line no-restricted-globals
        const x = confirm('Bạn chắc chắn muốn xóa ?');
        if (x) {
          e.target.parentElement.parentElement.remove();
          await new ApiClient().delete(props.urlRemove + row.id);
          AddToast('Success', 'Xóa thành công !', 'toast');
        }
      } else if (props.buttonFunc) {
        props.buttonFunc(index);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="a-table">
      <div className="a-table-head">
        {props.columns ? props.columns.map((column) => (
          <span key={column.key} className={`${column.key} ${column.class} text-${column.align}`}>{column.title}</span>
        )) : ''}
      </div>

      <div className="a-table-content">
        {props.data ? props.data.map((row: any, i: any) => (
          <TableRow key={row.id} is_router_link={props.is_router_link} to={routerLink(row)}>
            {props.columns ? props.columns.map((column) => (
              // eslint-disable-next-line no-nested-ternary
              column.key === 'remove' ? (
                <div className="remove">
                  <Button className="btn bg-red-300 hover:bg-red-400 btn-icon text-white p-1 rounded text-sm" onClick={(e) => handleRemove(e, row, i)}>Remove</Button>
                </div>
              ) : column.scopedSlots && props.scopedSlotsRenderFunc ? props.scopedSlotsRenderFunc(row, column) : (
                column.isTime ? <span className={`${column.key} ${column.class} text-${column.align}`}>{changeISOTimeToMyFormTime(row[column.key])}</span>
                  : <span className={`${column.key} ${column.class} text-${column.align}`}>{row[column.key]}</span>
              )
            )) : ''}
          </TableRow>
        )) : ''}
      </div>
    </div>
  );
}

export default Table;
