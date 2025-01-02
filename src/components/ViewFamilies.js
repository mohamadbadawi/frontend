import React, { useState, useEffect } from "react";

const ViewFamilies = () => {
  const [families, setFamilies] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch families data from the backend
  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/admin/view-families");
        const data = await response.json();
        if (response.ok) {
          setFamilies(data.families);
        } else {
          setMessage(data.message || "Failed to load families.");
        }
      } catch (error) {
        setMessage("Error fetching families.");
        console.error(error);
      }
    };

    fetchFamilies();
  }, []);

  return (
    <div className="container">
      <h1>View Families</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Family Name</th>
            <th>Number of Members</th>
            <th>Location Name</th>
          </tr>
        </thead>
        <tbody>
          {families.map((family) => (
            <tr key={family.id}>
              <td>{family.familyname}</td>
              <td>{family.numberofmembers}</td>
              <td>{family.locationname || "No location"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFamilies;
