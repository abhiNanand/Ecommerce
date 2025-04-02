import "./MyAccount.scss";
import { useAuth } from "../../../../Services/UserAuth";
import { NavLink, Outlet } from "react-router-dom";
import {ROUTES} from '../../../../Shared/Constants'

export default function MyAccount() {
  const { user } = useAuth();

  return (
    <div className="myaccount-container">
      <div className="myaccount-header">
        <p className="breadcrumb">Home / My Account</p>
        <p className="user-name">{user?.displayName || ""}</p>
      </div>

      <div className="myaccount-content">
        <nav className="myaccount-sidebar">
          <h3>Manage My Account</h3>
          <NavLink to='/account' className="nav-link" end>My Profile</NavLink>
          <NavLink to={ROUTES.ADDRESS} className="nav-link">Address Book</NavLink>
          <NavLink to={ROUTES.PAYMENT} className="nav-link">My Payment Options</NavLink>

          <h3>My Orders</h3>
          <NavLink to={ROUTES.RETURN} className="nav-link">My Returns</NavLink>
          <NavLink to={ROUTES.CANCLE} className="nav-link">My Cancellations</NavLink>

          <h3>My Wishlist</h3>
          <NavLink to={ROUTES.WISHLIST} className="nav-link">View Wishlist</NavLink>
        </nav>

        <div className="myaccount-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}




export function Address() {
   return (<><h1>ADDRESS</h1></>);
}

export function Payment() {
   return (<><h1>PAYMENT</h1></>);
}

export function Return() {
   return (<><h1>RETURN</h1></>);
}

export function Cancel() {
   return (<><h1>CANCEL</h1></>);
}