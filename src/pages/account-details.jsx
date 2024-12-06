import React, { useEffect, useState } from "react";
import { getUserDetails, getCampaigns } from "../api/api";

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; 

    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(token);
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const userCampaigns = await getCampaigns(token);
        setCampaigns(userCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchUserDetails();
    fetchCampaigns();
  }, []); 

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Account Details</h1>
        
        {userDetails ? (
          <div className="user-info">
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
          </div>
        ) : (
          <p>Failed to load user details.</p>
        )}

        <h2>Your Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>You are not part of any campaigns.</p>
        ) : (
          <div className="campaigns">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="campaign">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;