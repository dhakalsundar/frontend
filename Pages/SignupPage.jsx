import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Styles/Signup.css';
import axios from 'axios';  // Import axios

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');

    try {
      // Sending the POST request to the backend
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      alert("User registration successful!");
      console.log('User registered successfully:', response.data);
      // Optionally, redirect to login page after successful registration
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Error registering user. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="signup-button">Signup</button>
      </form>

      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default SignupPage;
