import React, { useState } from "react";
import "../styles.css"; // Ensure styles.css is properly linked

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !type) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, type }),
      });

      if (response.status === 201) {
        // Clear the form and show a success message
        setUsername("");
        setPassword("");
        setType("");
        setMessage("User added successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add user.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the user.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
