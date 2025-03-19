import { Search, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import './Header.scss';

export default function Header() {
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
          <button type="button" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        <div className="icons">
          <button type="button" aria-label="Favorites">
            <Heart size={24} />
          </button>
          <button type="button" aria-label="Shopping Cart">
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
