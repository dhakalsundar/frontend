import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ProfilePage from './Pages/ProfilePage';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/Home';
import ExploreRecipes from './Pages/Recip';
import Settings from './Pages/Settings';
import UserTable from './Pages/UserTable';
import AddRecipeTable from './Pages/AddRecipeTable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editprofile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="UserTable" element={<UserTable/>} />
          <Route path="AddRecipeTable" element={<AddRecipeTable/>} />

          
        </Route>
        {/* ✅ Move ExploreRecipes outside of Dashboard if needed */}
        <Route path="/recipe" element={<ExploreRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
