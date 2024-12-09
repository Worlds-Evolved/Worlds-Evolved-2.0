import React, { useEffect, useState } from "react";
import { getUserDetails, getCampaignDetails } from "../api/api";
import { createCampaign, changePassword } from "../api/api";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaignData, setNewCampaignData] = useState({
    title: "",
    description: "",
    playerIds: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!token) return;

    const playerIdsArray = newCampaignData.playerIds
      .split(",")
      .map((id) => +id.trim());

    try {
      const campaignData = {
        title: newCampaignData.title,
        description: newCampaignData.description,
        playerIds: playerIdsArray,
      };

      const newCampaign = await createCampaign(campaignData, token);
      console.log("Campaign created:", newCampaign);
      navigate(`DM's HUB LINK GOES HERE`);
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data?.error || "Failed to create campaign");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCampaignData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Account Details</h1>
        
        {userDetails ? (
          <div class ="user-info">
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <h2>Create Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="create-campaign-form">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={newCampaignData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCampaignData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="playerIds">Player IDs (comma-separated)</label>
                <input
                  id="playerIds"
                  name="playerIds"
                  type="text"
                  value={newCampaignData.playerIds}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Create Campaign</button>
            </form>
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