import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Left section */}
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">
              Product Management
            </Link>
            {isAuthenticated && (
              <Link
                to="/products/new"
                className="navbar-link"
              >
                Add Product
              </Link>
            )}
          </div>

          {/* Center section - Search */}
          {isAuthenticated && (
            <div className="navbar-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                />
              </div>
            </div>
          )}

          {/* Right section */}
          <div className="navbar-right">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="navbar-link"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 