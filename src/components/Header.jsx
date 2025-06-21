import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">
          <Link to="/" onClick={handleClose} aria-label="Go to homepage">
           
          </Link>
        </div>
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={handleToggle}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>
      <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/trending" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Trending</NavLink>
          </li>
          <li>
            <NavLink to="/live-deals" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Live Deals</NavLink>
          </li>
          <li>
            <NavLink to="/offers" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Offers</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/refer" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Refer & Earn</NavLink>
          </li>
          
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/admin/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleClose}>Admin Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;