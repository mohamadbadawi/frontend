import React, { useState, useEffect } from "react";

const AddDonation = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorContact, setDonorContact] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/resources");
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedResource || !quantity) {
      setMessage("Resource and quantity are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/api/admin/add-donation/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: donorName,
          donor_contact: donorContact,
          resource_id: selectedResource,
          quantity,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setDonorName("");
        setDonorContact("");
        setSelectedResource("");
        setQuantity("");
      } else {
        setMessage(data.message || "Failed to add donation.");
      }
    } catch (error) {
      console.error("Error adding donation:", error);
      setMessage("Error adding donation.");
    }
  };

  return (
    <div>
      <h1>Add Donation</h1>
      <form onSubmit={handleSubmit}>
        <label>Donor Name (optional):</label>
        <input
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
        <br />

        <label>Donor Contact (optional):</label>
        <input
          type="text"
          value={donorContact}
          onChange={(e) => setDonorContact(e.target.value)}
        />
        <br />

        <label>Resource:</label>
        <select
          value={selectedResource}
          onChange={(e) => setSelectedResource(e.target.value)}
          required
        >
          <option value="">Select Resource</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
        <br />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br />

        <button type="submit">Add Donation</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddDonation;
