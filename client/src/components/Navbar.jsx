import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📦</span>
          Project Marketplace
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">Browse</Link>

          {user && user.role === 'creator' && (
            <Link to="/upload" className="nav-link">Upload</Link>
          )}

          {user && user.role === 'creator' && (
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}

          {user && user.role === 'viewer' && (
            <Link to="/request-creator" className="nav-link">Become Creator</Link>
          )}

          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
