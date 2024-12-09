import React, { useEffect, useState } from "react";
import { getUserDetails, getCampaignDetails } from "../api/api";

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const details = await getUserDetails(token);
          setUserDetails(details);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      }
    };

    const fetchCampaigns = async () => {
      if (!token) {
        console.error("NO TOKEN");
        return;
      }
    
      try {
        const campaignIds = [14];
        const fetchedCampaigns = await Promise.all(
          campaignIds.map((id) => getCampaignDetails(id, token))
        );
        console.log("Fetched Campaign Details:", fetchedCampaigns);
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      }
    };

    fetchUserDetails();
    fetchCampaigns();
  }, [token]);

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Account Details</h1>
        
        {userDetails ? (
          <div class ="user-info">
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
          <div class ="campaigns">
            {campaigns.map((campaign) => (
              <div key={campaign.id} class ="campaign">
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