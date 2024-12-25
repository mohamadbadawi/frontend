import React, { useEffect, useState } from 'react';
import '../styles.css';  // Importing the global CSS file

const ViewMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('http://localhost:5500/api/members');
      const data = await response.json();
      if (response.ok) {
        setMembers(data);
      } else {
        alert(data.message);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="view-members-container">
      <h1>View Members</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Special Needs</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.specialNeeds}</td>
              <td>{member.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMembers;
