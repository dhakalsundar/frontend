import { NavLink, Outlet } from "react-router-dom";
import "../Styles/Dashboard.css"; // Import the CSS for Dashboard

const Dashboard = () => {
  const userID = localStorage.getItem("userID"); // Get userID from localStorage
  const roleId = localStorage.getItem("roleId"); // Get roleId from localStorage

  return (
    <div style={{ display: "flex" }}>
      {/* Left Sidebar (Navbar) */}
      <div className="dashboard-sidebar">
        <ul>
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Settings
            </NavLink>

          </li>
       

          {/* Show these links only if roleId is "2" (Admin) */}
          {roleId === "2" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/UserTable"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  User Table
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/AddRecipeTable"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Add Recipe
                </NavLink>
              </li>
            </>
          )}

<li>
  <NavLink
    to="/"
    className={({ isActive }) => (isActive ? "active-link" : "")}
    onClick={() => {
      localStorage.removeItem("userID"); 
      localStorage.removeItem("roleId");
    }}
  >
    Logout
  </NavLink>
</li>

        </ul>
      </div>

      {/* Right Container where Pages are Loaded Dynamically */}
      <div className="dashboard-content">
        <Outlet context={{ userID, roleId }} />
      </div>
    </div>
  );
};

export default Dashboard;
