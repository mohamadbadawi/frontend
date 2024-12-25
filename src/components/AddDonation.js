import React, { useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const AddDonation = () => {
  const [resourceId, setResourceId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  const handleAddDonation = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5500/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId, quantity, date })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Donation added successfully!');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="add-donation-container">
      <h1>Add Donation</h1>
      <form onSubmit={handleAddDonation}>
        <label>
          Resource ID:
          <input
            type="text"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;
