import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaHome, FaFileMedical, FaGift } from 'react-icons/fa';  // React Icons
import '../styles.css';  // Importing the global CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <Link to="/add-user" className="dashboard-link">
            <FaUserPlus size={30} />
            <p>Add User</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/add-family" className="dashboard-link">
            <FaHome size={30} />
            <p>Add Family</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/add-location" className="dashboard-link">
            <FaHome size={30} />
            <p>Add Location</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/add-resource" className="dashboard-link">
            <FaFileMedical size={30} />
            <p>Add Resource</p>
          </Link>
        </div>


        <div className="dashboard-card">
          <Link to="/add-request" className="dashboard-link">
            <FaFileMedical size={30} />
            <p>Add New Aid Request</p>
          </Link>
        </div>






        <div className="dashboard-card">
          <Link to="/add-donation" className="dashboard-link">
            <FaGift size={30} />
            <p>Add Donation</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/view-users" className="dashboard-link">
            <FaUsers size={30} />
            <p>View Users</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/view-families" className="dashboard-link">
            <FaUsers size={30} />
            <p>View Families</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/view-requests" className="dashboard-link">
            <FaFileMedical size={30} />
            <p>View Requests</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
