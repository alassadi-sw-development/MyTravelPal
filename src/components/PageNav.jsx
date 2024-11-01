import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';
import styles from './PageNav.module.css';
import Logo from "./Logo";

function PageNav() {
  const { isAuthenticated, setRedirectPath, logout } = useAuth();
  const navigate = useNavigate();

  const handleProtectedLinkClick = (path) => {
    if (!isAuthenticated) {
      setRedirectPath(path);
      navigate('/login');
    }
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/book" onClick={() => handleProtectedLinkClick('/book')}>Book your Trip</NavLink>
        </li>
        <li>
          <NavLink to="/app" onClick={() => handleProtectedLinkClick('/app')}>Map</NavLink>
        </li>
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
          </li>
        ) : (
        <li>
          <NavLink to="/" onClick={logout} className={styles.ctaLink} style={{ backgroundColor: '#c40031' }}>LogOut</NavLink>
        </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
