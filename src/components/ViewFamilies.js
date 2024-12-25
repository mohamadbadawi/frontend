import React, { useEffect, useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const ViewFamilies = () => {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await fetch('http://localhost:5500/api/families');
      const data = await response.json();
      if (response.ok) {
        setFamilies(data);
      } else {
        alert(data.message);
      }
    };
    fetchFamilies();
  }, []);

  return (
    <div className="view-families-container">
      <h1>View Families</h1>
      <table>
        <thead>
          <tr>
            <th>Family Name</th>
            <th>Number of Members</th>
          </tr>
        </thead>
        <tbody>
          {families.map((family) => (
            <tr key={family.id}>
              <td>{family.familyName}</td>
              <td>{family.numberOfMembers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFamilies;
