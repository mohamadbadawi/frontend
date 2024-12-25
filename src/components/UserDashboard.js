import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';  // Importing the global CSS file

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <h1>User Dashboard</h1>
      <div>
        <Link to="/add-family">Add Family</Link>
      </div>
      <div>
        <Link to="/add-request">Add Request</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
