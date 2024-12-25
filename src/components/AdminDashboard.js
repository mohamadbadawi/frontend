import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';  // Importing the global CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div>
        <Link to="/add-user">Add User</Link>
      </div>
      <div>
        <Link to="/add-family">Add Family</Link>
      </div>

      <div>
        <Link to="/add-location">Add Location</Link>
      </div>

      <div>
        <Link to="/add-resource">Add Resource</Link>
      </div>
      <div>
        <Link to="/add-donation">Add Donation</Link>
      </div>
      <div>
        <Link to="/view-users">View Users</Link>
      </div>
      <div>
        <Link to="/view-families">View Families</Link>
      </div>
      <div>
        <Link to="/view-requests">View Requests</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
