import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';  // Import axios

import '../Styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      // If login is successful, redirect to the dashboard or another page
      if (response.data.token) {
        console.log(response.data.user.id);
        localStorage.setItem('userID', response.data.user.id);  // Save userID in localStorage

        localStorage.setItem('authToken', response.data.token);  // Save token to localStorage
        alert("Login Successfull")
        navigate('/dashboard');

      }
     
    } catch (err) {
      alert("Invalid Credentials")
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p>Don't have an account? <Link to="/register">Signup here</Link></p>

      </form>
    </div>
  );
};

export default LoginPage;
