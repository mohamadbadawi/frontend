import React, { useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const AddResource = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');

  const handleAddResource = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5500/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, totalQuantity })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Resource added successfully!');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="add-resource-container">
      <h1>Add Resource</h1>
      <form onSubmit={handleAddResource}>
        <label>
          Resource Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Total Quantity:
          <input
            type="number"
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
};

export default AddResource;
