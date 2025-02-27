import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/Home";
import ExploreRecipes from "./Pages/Recip";
import Settings from "./Pages/Settings";
import UserTable from "./Pages/UserTable";
import AddRecipeTable from "./Pages/AddRecipeTable";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./Pages/Admin Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        {/* Admin Routes (NEEDS OUTLET in AdminDashboard) */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<HomePage />} /> {/* Default for /admin */}
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editprofile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="addrecipetable" element={<AddRecipeTable />} />
        </Route>

        {/* Main Dashboard with Nested Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editprofile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="addrecipetable" element={<AddRecipeTable />} />
        </Route>

        {/* Explore Recipes Route */}
        <Route path="/recipe" element={<ExploreRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
