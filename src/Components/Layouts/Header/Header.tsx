import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ShoppingBag,
  CircleX,
  LogOut,
  Star,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {  signOut } from 'firebase/auth';
import { useDispatch} from 'react-redux';

import { ROUTES_CONFIG, ROUTES } from '../../../Shared/Constants';
import { logoutUser} from '../../../Store/Common';
import { auth } from '../../../Services/firebase/firebase';
import { useAuth} from '../../../Services/UserAuth';

import './Header.scss';

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
   const dispatch = useDispatch();



   const { isAuthenticated, user } = useAuth();
  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate(ROUTES.HOMEPAGE);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <h1>Exclusive</h1>
        </div>

        <nav className="nav-links">
          <Link to={ROUTES.HOMEPAGE}>Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        {!isAuthenticated &&  <Link to={ROUTES.SIGNUP}>Signup</Link> } 
        </nav>

        <div className="search-box">
          <input type="text" placeholder="What are you looking for?" />
          <button type="button" className="search-box-btn" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        <div className="icons">
          <Link
            to={ROUTES_CONFIG.WISHLIST.path}
            className="icons-btn"
            aria-label="Favorites"
          >
            <Heart size={24} />
          </Link>
          <Link
            to={ROUTES_CONFIG.CART.path}
            className="icons-btn"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={24} />
          </Link>
          {isAuthenticated && (
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                aria-label="account"
                onClick={() => setOpen(!open)}
                onBlur={() => {setTimeout(()=>setOpen(false),500)}}
              >
                <User size={24} />
              </button>

              {open && (
                <div className="dropdown-content">
                  <Link to={ROUTES.ACCOUNT}>
                    <User size={24} /> Manage My Account
                  </Link>
                  <Link to="">
                    <ShoppingBag size={24} />
                    My Orders
                  </Link>
                  <Link to="">
                    <CircleX size={24} />
                    My Cancellations
                  </Link>
                  <Link to="">
                    <Star size={24} />
                    My Reviews
                  </Link>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="logout-btn"
                  >
                    <LogOut size={24}/>  <span className="logout-title">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          
          {isAuthenticated && (
            <span className="username">Welcome, {user?.displayName || 'User'}</span>
          )}
        </div>
      </div>
    </header>
  );
}

// updateProfile(user, { displayName: name })

// This function updates the Firebase Authentication user's profile.

// await user.reload()

// After updating the profile, Firebase Authentication does not immediately update the user object in your app.
// user.reload() refreshes the user object to reflect the latest updates from Firebase.
