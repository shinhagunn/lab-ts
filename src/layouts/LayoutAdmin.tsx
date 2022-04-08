import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/layouts/layout_admin.less';

interface LayoutAdminProps {
  selected?: number
  pageName?: string
}

interface breadcrumb {
  id: number;
  url: string;
  name: string;
}

function LayoutAdmin(props: React.PropsWithChildren<LayoutAdminProps>) {
  const menuLogoes = ['', 'fas fa-home', 'fas fa-user', 'fa-solid fa-list', 'fa-solid fa-vest-patches', 'fas fa-compact-disc', 'fa-solid fa-comment'];
  const logoNow = menuLogoes[props.selected ?? 0];

  function getBreadcrumb() {
    const urlCurrent = useLocation().pathname;
    const result:breadcrumb[] = [];
    const tam = urlCurrent.split('/');
    tam.shift();
    let urlTotal = tam[0];
    for (let i = 0; i < tam.length; i++) {
      if (i === (tam.length - 1)) {
        const x = tam[i];
        tam[i] = `${urlTotal}/${tam[i]}`;
        urlTotal = `${urlTotal}/${x}`;
        let y = x[0].toUpperCase();
        y += x.slice(1);
        result[i] = {
          id: i,
          name: y,
          url: tam[i],
        };
      } else if (i > 0) {
        const x = tam[i];
        tam[i] = `${urlTotal}/${tam[i]}`;
        urlTotal = `${urlTotal}/${x}`;
        let y = x[0].toUpperCase();
        y += x.slice(1);
        result[i] = {
          id: i,
          name: `${y} / `,
          url: tam[i],
        };
      } else {
        result[i] = {
          id: i,
          name: 'admin / ',
          url: tam[i],
        };
      }
    }
    return result;
  }

  const breadcrumb = getBreadcrumb();
  const navigation = useNavigate();

  return (
    <div className="admin-container">
      <div className="menu">
        <h2 className="menu-icon">
          <i className="fas fa-chart-line" />
          ReactJS
        </h2>
        <ul className="menu-list">
          <li className={`item ${props.selected === 2 ? 'item-selected' : ''}`}>
            <Link to="/admin/users">
              <i className="fas fa-user" />
              Users
            </Link>
          </li>
          <li className={`item ${props.selected === 3 ? 'item-selected' : ''}`}>
            <Link to="/admin/skills">
              <i className="fa-solid fa-list" />
              Skills
            </Link>
          </li>
          <li className={`item ${props.selected === 4 ? 'item-selected' : ''}`}>
            <Link to="/admin/projects">
              <i className="fa-solid fa-vest-patches" />
              Projects
            </Link>
          </li>
          <li className={`item ${props.selected === 5 ? 'item-selected' : ''}`}>
            <Link to="/admin/schools">
              <i className="fa-solid fa-comment" />
              Schools
            </Link>
          </li>
        </ul>
        <Link to="/" className="logout">Return home</Link>
      </div>

      <div className="content">
        {/* <header className="header-top">
            <div v-if="drawer" className="filter" @click="onFilter">
                <i className="fas fa-filter"></i>
            </div>
        </header> */}

        <div className="header-content">
          <div className="title">
            <div className="icon">
              <i className={logoNow} />
            </div>
            <div className="page-name">
              <h3>{ props.pageName }</h3>
            </div>
          </div>

          <div className="breadcrumb">
            {breadcrumb.map((item: any) => (
              <Link key={item.id} to={`/${item.url}`} className="bread-item">{ item.name }</Link>
            ))}
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default LayoutAdmin;
