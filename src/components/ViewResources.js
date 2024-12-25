import React, { useEffect, useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const ViewResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch('http://localhost:5500/api/resources');
      const data = await response.json();
      if (response.ok) {
        setResources(data);
      } else {
        alert(data.message);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="view-resources-container">
      <h1>View Resources</h1>
      <table>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Description</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.description}</td>
              <td>{resource.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResources;
