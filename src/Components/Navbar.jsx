// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

// Navbar.js

const Navbar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/overview">Dashboard Overview</Link>
        </li>
        <li>
          <Link to="/recent">Recent Activity</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

