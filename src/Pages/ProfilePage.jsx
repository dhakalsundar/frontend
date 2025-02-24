import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';
import { Link, Outlet, useOutletContext, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { userID } = useOutletContext();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePhoto: ''
  });
  const [file, setFile] = useState(null);  // Only store the file selected, no auto-update
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/fetch-profile/${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        setError('Error fetching profile data');
      }
    };

    fetchUserData();
  }, [userID]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Update the selected file when the user selects an image
  };

  console.log(userData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    
    // Append profile photo only if it's selected
    if (file) {
      formData.append('profile_photo', file);
    }

    try {
      // Send the request with the FormData and the token
      const response = await axios.put(`http://localhost:5000/api/users/edit/${userID}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
       // Clear password field after successful update

      // Redirect after successful profile update
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
      <div className="profile-picture-container">
 
  <div className="profile-picture-preview">
    <img
      src={file ? URL.createObjectURL(file) : userData.profile_photo || 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Wamiqa_Gabbi_snapped_outside_Maddock_office_%282%29_%28cropped%29.jpg'}
      alt="Profile"
      className="profile-picture"
    />
  </div>
  <label htmlFor="fileInput" className="file-label">Change Picture</label>
  <input
    type="file"
    id="fileInput"
    onChange={handleFileChange}
    className="file-input"
  />
</div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

   

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
