import React, { useState, useEffect } from "react";

const AddRequest = () => {
  const [familyName, setFamilyName] = useState("");
  const [familyId, setFamilyId] = useState(null); // Track family ID separately
  const [resourceName, setResourceName] = useState("");
  const [resourceId, setResourceId] = useState(null); // Optional, if resources have duplicate names
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [families, setFamilies] = useState([]);
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyResponse = await fetch("http://localhost:5500/api/families");
        const familyData = await familyResponse.json();
        if (familyData.families) {
          setFamilies(familyData.families);
        }

        const resourceResponse = await fetch("http://localhost:5500/api/resources");
        const resourceData = await resourceResponse.json();
        if (resourceData.resources) {
          setResources(resourceData.resources);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFamilyNameChange = (e) => {
    const value = e.target.value;
    setFamilyName(value);

    if (value) {
      const filtered = families.filter((family) =>
        family.familyname.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFamilies(filtered);
    } else {
      setFilteredFamilies([]);
    }
  };
  const handleFamilySelection = (family) => {
    console.log("Selected Family:", family);
    setFamilyName(family.familyname);
    setFamilyId(family.id);
    setFilteredFamilies([]);
  };
  

  const handleResourceNameChange = (e) => {
    const value = e.target.value;
    setResourceName(value);

    if (value) {
      const filtered = resources.filter((resource) =>
        resource.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources([]);
    }
  };

  const handleResourceSelection = (resource) => {
    setResourceName(resource.name);
    setResourceId(resource.id); // Optional: Set the selected resource's ID
    setFilteredResources([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    console.log("Family ID:", familyId);
    console.log("Resource Name:", resourceName);
    console.log("Quantity:", quantity);
  
    if (!familyId || !resourceName || !quantity) {
      setMessage("Family, resource, and quantity are required.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5500/api/admin/add-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId, // Send the selected family ID
          resourceName,
          quantity,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        setFamilyName("");
        setFamilyId(null);
        setResourceName("");
        setQuantity("");
      } else {
        setMessage(data.message || "Failed to add request.");
      }
    } catch (error) {
      console.error("Error adding request:", error);
      setMessage("Error adding request.");
    }
  };
  

  return (
    <div>
      <h1>Add Request</h1>
      <form onSubmit={handleSubmit}>
        <label>Family Name:</label>
        <input
          type="text"
          value={familyName}
          onChange={handleFamilyNameChange}
          required
        />
        {filteredFamilies.length > 0 && (
          <ul>
            {filteredFamilies.map((family) => (
              <li
                key={family.id}
                onClick={() => handleFamilySelection(family)}
              >
                {family.familyname} (ID: {family.id})
              </li>
            ))}
          </ul>
        )}
        <br />

        <label>Resource Name:</label>
        <input
          type="text"
          value={resourceName}
          onChange={handleResourceNameChange}
          required
        />
        {filteredResources.length > 0 && (
          <ul>
            {filteredResources.map((resource) => (
              <li
                key={resource.id}
                onClick={() => handleResourceSelection(resource)}
              >
                {resource.name}
              </li>
            ))}
          </ul>
        )}
        <br />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br />

        <button type="submit">Add Request</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AddRequest;
