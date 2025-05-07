import './MyAccount.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES, BREADCRUMB,TEXT} from '../../../../Shared/Constants';

export default function MyAccount() {
  return (
    <div className="myaccount-container">
      <div className="myaccount-header">
        <p className="breadcrumb">
          <NavLink to={ROUTES.HOMEPAGE}>{BREADCRUMB.HOME}</NavLink>
          <NavLink to={ROUTES.ACCOUNT}>{BREADCRUMB.ACCOUNT}</NavLink>
        </p>
      </div>

      <div className="myaccount-content">
        <nav className="myaccount-sidebar">
          <h3>{TEXT.MANAGE_ACCOUNT}</h3>
          <NavLink to="/account" className="nav-link" end>
            {TEXT.MY_PROFILE}
          </NavLink>
          <NavLink to={ROUTES.ADDRESS} className="nav-link">
            {TEXT.ADDRESS_BOOK}
          </NavLink>
        </nav>
        <div className="myaccount-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
