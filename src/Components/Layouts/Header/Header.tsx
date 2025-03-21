import { Search, Heart, ShoppingCart, User, ShoppingBag, CircleX, LogOut, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged ,signOut} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';


import { updateAuthTokenRedux } from '../../../Store/Common';
import { auth } from '../../../Views/Auth/Login/firebase';
import { ROUTES } from '../../../Shared/Constants';
import { RootState } from '../../../Store';

import './Header.scss';

export default function Header() {
  const navigate= useNavigate()
  const [open, setOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const dispatch= useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
        console.log("hello");
      }
      else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);


  //check if logged in or not. 
  const token = useSelector((state:RootState)=>state?.common?.token);
  const isAuthenticated = !!token;
   // Logout function
   const handleLogout = async () => {
    await signOut(auth);
    dispatch(updateAuthTokenRedux({token:null}));
    setUserName(null);
    navigate(ROUTES.HOMEPAGE)
  };


  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <h1>Exclusive</h1>
        </div>

        <nav className="nav-links">
          <Link to={ROUTES.HOMEPAGE}>Home</Link>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <Link to={ROUTES.SIGNUP}>Signup</Link>
        </nav>

        <div className="search-box">
          <input type="text" placeholder="What are you looking for?" />
          <button type="button" className="search-box-btn" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        <div className="icons">
          <button type="button" className="icons-btn" aria-label="Favorites">
            <Heart size={24} />
          </button>
          <button type="button" className="icons-btn" aria-label="Shopping Cart">
            <ShoppingCart size={24} />
          </button>
          {isAuthenticated &&  <div className="dropdown">
            <button
              type="button"
              className="dropdown-btn"
              aria-label="account"
              onClick={() => setOpen(!open)}
            >
              <User size={24} />
            </button>

            {open && (
              <div className="dropdown-content">
                <Link to=""><User size={24} /> Manage My Account</Link>
                <Link to=""><ShoppingBag size={24} />My Orders</Link>
                <Link to=""><CircleX size={24} />My Cancellations</Link>
                <Link to=""><Star size={24} />My Reviews</Link>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={24} /> Logout
                </button>
              </div>
            )}
          </div> }
         
          
{/* showing name if user exists */}
{isAuthenticated && (  <span className="username">Welcome, {userName}</span> )}
        </div>
        
      </div>
    </header>
  );
}
