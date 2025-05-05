 import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ShoppingBag,
  LogOut,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES_CONFIG, ROUTES } from '../../../Shared/Constants';
import { logoutUser } from '../../../Store/Common';
import { auth } from '../../../Services/firebase/firebase';
import { useAuth } from '../../../Services/UserAuth';

import { getCartItems } from '../../../Services/Cart/CartService';
import { getWishlistItems } from '../../../Services/Wishlist/WishlistService';
import {
  updateCartItem,
  updateWishlistItem,
} from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store';
import './Header.scss';

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();

  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const wishlistCount = useSelector(
    (state: RootState) => state.item.noOfWishlistItem
  );
  const location = useLocation();

  useEffect(() => {
    const isSearchPage = location.pathname.startsWith('/search');
    if (!isSearchPage) setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const   wishlistItems  = await getWishlistItems();
        const cartItems = await getCartItems();
        const totalQuantity = cartItems.reduce(
          (acc, item) => acc + (item.quantity ?? 1),
          0
        );
        dispatch(updateCartItem(totalQuantity));
        dispatch(updateWishlistItem(wishlistItems.length));
      } else {
        dispatch(updateCartItem(0));
        dispatch(updateWishlistItem(0));
      }
    });

    return () => unsubscribe();  
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate(ROUTES.HOMEPAGE);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search/${searchQuery.trim()}`);
    } else {
      toast.warning('Search field cannot be empty');
    }
  };

  const handleSearchInput = (value: string) => {
    if (value.trim() === '') {
      if (location.pathname.includes('/search')) navigate('/search/all');
      setSearchQuery('');
    } else setSearchQuery(value);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link to={ROUTES.HOMEPAGE}>EXCLUSIVE</Link>
        </div>

        <nav className="nav-links">
          <NavLink className="header-nav-link" to={ROUTES.HOMEPAGE}>
            Home
          </NavLink>
          <NavLink className="header-nav-link" to="/contact">
            Contact
          </NavLink>
          <NavLink className="header-nav-link" to="/about">
            About
          </NavLink>
          {!isAuthenticated && (
            <NavLink className="header-nav-link" to={ROUTES.LOGIN}>
              Login
            </NavLink>
          )}
        </nav>
        <div className="search-input-btn">
          <div className="search-box">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => {
                handleSearchInput(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                className="clearField-btn"
                onClick={() => handleSearchInput('')}
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className="search-box-btn-div">
            <button
              type="button"
              className="search-box-btn"
              aria-label="Search"
              onClick={() => handleSearch()}
            >
              <Search size={25} />
            </button>
          </div>
        </div>

        <div className="icons">
          {isAuthenticated && (
            <>
              <Link
                to={ROUTES_CONFIG.WISHLIST.path}
                className="icons-btn"
                aria-label="Favorites"
              >
                <Heart size={24} />
                {wishlistCount > 0 && isAuthenticated && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </Link>
              <Link
                to={ROUTES_CONFIG.CART.path}
                className="icons-btn"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && isAuthenticated && (
                  <span className="badge">{cartCount}</span>
                )}
              </Link>
            </>
          )}
          {isAuthenticated && (
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                aria-label="account"
                onClick={() => setOpen(!open)}
                onBlur={() => {
                  setTimeout(() => setOpen(false), 500);
                }}
              >
                <User size={24} />
              </button>

              {open && (
                <div className="dropdown-content">
                  <Link to={ROUTES.ACCOUNT}>
                    <User size={24} /> Manage My Account
                  </Link>
                  <Link to="/order">
                    <ShoppingBag size={24} />
                    My Orders
                  </Link>
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={() => setOpenLogout(true)}
                  >
                    <LogOut size={24} />{' '}
                    <span className="logout-title">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {isAuthenticated && (
            <span className="username">
              Welcome, {user?.displayName ?? 'User'}
            </span>
          )}
        </div>
      </div>
      {openLogout && (
        <div className="confirmation-container">
          <div>
            <div className="confirm-title-btn">
              <h3>Logout Confirmation</h3>
              <p>Are you sure you want to log out?</p>
              <div className="confirm-n-cancel-btn">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    handleLogout();
                    setOpenLogout(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setOpenLogout(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

 



// updateProfile(user, { displayName: name })

// This function updates the Firebase Authentication user's profile.

// await user.reload()

// After updating the profile, Firebase Authentication does not immediately update the user object in your app.
// user.reload() refreshes the user object to reflect the latest updates from Firebase.

//    setTimeout(()=>fetchItemCounts(),1000);//yha pr settimeout isleeye lagaye hai q ki agar user refesh karna hai tho auth ke thora time lagta hai ,agar ye nhi karenge tho user show karenga ki user logged in nhi hai
