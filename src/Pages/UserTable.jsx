import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/UserTable.css"; // Import CSS for styling

const UserTable = () => {
  const [users, setUsers] = useState(null); // Set initial state as null
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/get-all-users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Open edit form
  const openEditForm = (user) => {
    setSelectedUser({ ...user });
    setShowEditForm(true);
  };

  // Close edit form
  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedUser(null);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to save edited user
  const handleSaveUser = async () => {
    try {
      // Send update request to backend
      await axios.put(`http://localhost:5000/api/users/edit/${selectedUser.id}`, selectedUser);

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );

      // Close edit form
      closeEditForm();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user-table-container">
      <h1 className="table-title">👥 User Management</h1>
      <h2>User List</h2>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "User"}</td>
                    <td>
                      <button className="edit-button" onClick={() => openEditForm(user)}>
                        Edit
                      </button>
                      <button className="delete-button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="5">Loading users...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form Overlay */}
      {showEditForm && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Edit User</h2>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={selectedUser.name}
              onChange={handleInputChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
            <label>Role</label>
            <select
              name="role"
              value={selectedUser.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Editor">Editor</option>
            </select>
            <div className="overlay-buttons">
              <button onClick={handleSaveUser}>Save</button>
              <button onClick={closeEditForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
