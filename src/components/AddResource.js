import React, { useState, useEffect } from "react";

const AddResource = () => {
  const [name, setName] = useState(""); // Resource name
  const [description, setDescription] = useState(""); // Resource description (optional)
  const [quantity, setQuantity] = useState(""); // Quantity
  const [message, setMessage] = useState(""); // Success/error message
  const [resources, setResources] = useState([]); // List of resources for auto-complete
  const [filteredResources, setFilteredResources] = useState([]); // Filtered resources based on input

  // Fetch all resources from the backend on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/resources");
        const data = await response.json();
        if (data.resources) {
          setResources(data.resources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  // Handle input change for the resource name
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    // Filter resources based on the input value
    if (value) {
      const filtered = resources.filter((resource) =>
        resource.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources([]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    // Validate the required fields
    if (!name || !quantity) {
      setMessage("Resource name and quantity are required.");
      return; // Stop the form submission if fields are missing
    }

    try {
      const response = await fetch("http://localhost:5500/api/admin/add-resource/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the correct content type
        },
        body: JSON.stringify({
          name,
          description, // Optional
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Set the success message from the backend
        // Clear the form fields after successful submission
        setName("");
        setDescription("");
        setQuantity("");
        setFilteredResources([]); // Clear filtered resources after submission
      } else {
        setMessage(data.message || "Failed to add or update resource.");
      }
    } catch (error) {
      console.error("Error adding resource:", error);
      setMessage("Error adding resource.");
    }
  };

  return (
    <div>
      <h1>Add Resource</h1>
      <form onSubmit={handleSubmit}>
        <label>Resource Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
        {filteredResources.length > 0 && (
          <ul>
            {filteredResources.map((resource) => (
              <li key={resource.id} onClick={() => setName(resource.name)}>
                {resource.name}
              </li>
            ))}
          </ul>
        )}
        <br />

        <label>Description (optional):</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br />

        <button type="submit">Add Resource</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AddResource;
