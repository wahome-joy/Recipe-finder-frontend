import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  let username = localStorage.getItem('username');
  const navigate = useNavigate(); // 🔹 Hook for redirecting users

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // remove acces token
    localStorage.clear(); // Clears ALL localStorage data
    
    setIsLoggedIn(false); // 🔹 Update state to reflect logout

    navigate('/login'); // 🔹 Redirect user to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">RECIPE FINDER</a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/register">{isLoggedIn ? `` : 'Register'}</a></li>
          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          ) : (
            <li><a href="/login">Login</a></li>
          )}
          <li><a href="/addrecipes">{isLoggedIn ? 'Add Recipes' : ''}</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        
        <a href="/account" className="user-icon">
          <p>Welcome {isLoggedIn ? username : 'User'}</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;