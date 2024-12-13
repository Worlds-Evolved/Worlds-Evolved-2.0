import React, { useEffect, useState } from "react"
import { getAdminDashboard } from "../api/api"

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminDashboard(token);  
        setUsers(data.users);  
        setLoading(false);  
      } catch (err) {
        console.error("Failed to fetch admin data:", err.message);  
        setLoading(false);  
      }
    };

    fetchAdminData();
  }, [token]); 

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Campaigns</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.campaigns.map((campaign) => (
                    <div key={campaign.id}>{campaign.title}</div>
                  ))}
                  {user.campaignsAsGM.map((campaign) => (
                    <div key={campaign.id}>(GM) {campaign.title}</div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;