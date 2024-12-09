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
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!token) return;

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }, token);
      setPasswordSuccess("Password successfully changed.");
      setPasswordError("");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error.message);
      setPasswordError(error.response?.data?.error || "Failed to change password.");
    }
  };

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

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Account Details</h1>
        
        {userDetails ? (
          <div class ="user-info">
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            
            <h2>Change Password</h2>
            {passwordError && <p className="error">{passwordError}</p>}
            {passwordSuccess && <p className="success">{passwordSuccess}</p>}
            <form onSubmit={handlePasswordChange} className="password-change-form">
              <div>
                <label>Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div>
                <label>New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div>
                <label>Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <button type="submit">Change Password</button>
            </form>
            
            <h2>Create Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="create-campaign-form">
              <div>
                <label>Title</label>
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
                <label>Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCampaignData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Player IDs (comma-separated)</label>
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