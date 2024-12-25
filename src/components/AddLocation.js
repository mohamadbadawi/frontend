import React, { useState } from "react";
import "../styles.css";

const AddLocation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !address) {
      setMessage("Name and address are required.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5500/api/admin/add-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage("Location added successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add location.");
      }
    } catch (error) {
      console.error("Error adding location:", error);
      setMessage("An error occurred while adding the location.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Add Location</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Location</button>
      </form>
    </div>
  );
};

export default AddLocation;
