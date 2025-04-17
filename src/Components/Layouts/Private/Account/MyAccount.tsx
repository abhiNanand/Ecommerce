import './MyAccount.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';

export default function MyAccount() {
  return (
    <div className="myaccount-container">
      <div className="myaccount-header">
        <p className="breadcrumb">
          <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
          <NavLink to={ROUTES.ACCOUNT}> Account</NavLink>
        </p>
      </div>

      <div className="myaccount-content">
        <nav className="myaccount-sidebar">
          <h3>Manage My Account</h3>
          <NavLink to="/account" className="nav-link" end>
            My Profile
          </NavLink>
          <NavLink to={ROUTES.ADDRESS} className="nav-link">
            Address Book
          </NavLink>
        </nav>
        <div className="myaccount-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
