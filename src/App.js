import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AddFamily from "./components/AddFamily";

import AddResource from "./components/AddResource";
import AddDonation from "./components/AddDonation";
import ViewFamilies from "./components/ViewFamilies";
import ViewMembers from "./components/ViewMembers";
import ViewResources from "./components/ViewResources";
import ViewDonations from "./components/ViewDonations";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AddUser from "./components/AddUser";
import AddLocation from "./components/AddLocation";
import ViewUsers from "./components/ViewUsers";


import './styles.css'; // Importing the global CSS file

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* User Dashboard */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route path="/add-family" element={<AddFamily />} />
      
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-location" element={<AddLocation />} />

        <Route path="/view-families" element={<ViewFamilies />} />
        <Route path="/view-members" element={<ViewMembers />} />
        <Route path="/view-resources" element={<ViewResources />} />
        <Route path="/view-donations" element={<ViewDonations />} />
        <Route path="/view-users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
