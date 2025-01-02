import React, { useState, useEffect } from "react";

const AddFamily = () => {
  const [familyName, setFamilyName] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch locations on load
  useEffect(() => {
    fetch("http://localhost:5500/api/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data.locations))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  // Handle changes in the number of members
  const handleMemberCountChange = (count) => {
    setNumberOfMembers(count);
    const updatedMembers = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: "",
      age: "",
      phoneNumber: "",
    }));
    setMembers(updatedMembers);
  };

  // Handle member details input
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

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
          members,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Family and members added successfully!");
        setFamilyName("");
        setNumberOfMembers("");
        setLocationId("");
        setMembers([]);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add family and members.");
      }
    } catch (error) {
      console.error("Error adding family and members:", error);
      setMessage("Error adding family and members.");
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
        <br></br>

        <label>Number of Members:</label>
        <input
          type="number"
          value={numberOfMembers}
          onChange={(e) => handleMemberCountChange(Number(e.target.value))}
          required
        />
        <br></br>

        <label>Location:</label>
        <select
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          required
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name},{location.address}
            </option>
          ))}
        </select>

        <h2>Members</h2>
        {members.map((member, index) => (
          <div key={index}>
            <h3>Member {index + 1}</h3>
            <label>Name:</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              required
            />
   
            <label>Age:</label>
            <input
              type="number"
              value={member.age}
              onChange={(e) => handleMemberChange(index, "age", e.target.value)}
              required
            />
           
            <label>Phone Number:</label>
            <input
              type="text"
              value={member.phoneNumber}
              onChange={(e) => handleMemberChange(index, "phoneNumber", e.target.value)}
              required
            />
          </div>
        ))}

        <button type="submit">Add Family and Members</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AddFamily;
