import { NavLink, Outlet } from 'react-router-dom';
import '../Styles/Dashboard.css'; // Import the CSS for Dashboard
import UserTable from './UserTable';

const Dashboard = () => {
  const userID = localStorage.getItem('userID'); // Get userID from localStorage

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Sidebar (Navbar) */}
      <div className="dashboard-sidebar">
        <ul>
          <li>
            <NavLink 
              to="/dashboard/home" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/profile" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/Settings" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/help" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Help
            </NavLink>
          </li>

          
          <li>
            <NavLink 
              to="/dashboard/UserTable" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              UserTable
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/dashboard/AddRecipeTable" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              RecipeTable
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Container where Pages are Loaded Dynamically */}
      <div className="dashboard-content">
        <Outlet context={{ userID }} />
      </div>
    </div>
  );
};

export default Dashboard;
