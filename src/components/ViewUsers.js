import React, { useEffect, useState } from 'react';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch users on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/admin/view-users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        setMessage(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`http://localhost:5500/api/admin/delete-user/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setUsers(users.filter((user) => user.id !== id)); // Update the users list
      } else {
        setMessage(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div>
      <h1>View Users</h1>
      {message && <p>{message}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.type}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
