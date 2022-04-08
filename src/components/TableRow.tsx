import { Link } from 'react-router-dom';

interface TableRowProps {
  is_router_link?: boolean
  to?: string
}

function TableRow(props: React.PropsWithChildren<TableRowProps>) {
  return (
    props.is_router_link && props.to ? (
      <Link to={props.to} className="a-table-row">
        {props.children}
      </Link>
    ) : (
      <div className="a-table-row">
        {props.children}
      </div>
    )
  );
}

export default TableRow;
