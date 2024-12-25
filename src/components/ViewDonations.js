import React, { useEffect, useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const ViewDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('http://localhost:5500/api/donations');
      const data = await response.json();
      if (response.ok) {
        setDonations(data);
      } else {
        alert(data.message);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="view-donations-container">
      <h1>View Donations</h1>
      <table>
        <thead>
          <tr>
            <th>Resource ID</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.resourceId}</td>
              <td>{donation.quantity}</td>
              <td>{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDonations;
