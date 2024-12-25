import React, { useState, useEffect } from "react";

const AddFamily = () => {
  const [familyName, setFamilyName] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch locations on load
  useEffect(() => {
    fetch("http://localhost:5500/api/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data.locations))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await fetch("http://localhost:5500/api/admin/add-family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyName,
          numberOfMembers,
          locationId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Family added successfully!");
        setFamilyName("");
        setNumberOfMembers("");
        setLocationId("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add family.");
      }
    } catch (error) {
      console.error("Error adding family:", error);
      setMessage("Error adding family.");
    }
  };

  return (
    <div>
      <h1>Add Family</h1>
      <form onSubmit={handleSubmit}>
        <label>Family Name:</label>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          required
        />

        <label>Number of Members:</label>
        <input
          type="number"
          value={numberOfMembers}
          onChange={(e) => setNumberOfMembers(e.target.value)}
          required
        />

        <label>Location:</label>
        <select
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          required
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Family</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AddFamily;
