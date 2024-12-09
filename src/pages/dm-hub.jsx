import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails } from "../api/api";

const campaignId = 3
const DmHub = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [campaignDetails, setcampaignDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUserDetails = async () => {
      try {
        const username = await getUserDetails(token);
        setUserDetails(username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchCampaignDetails = async () => {
      try {
        const campaignDetails = await getCampaignDetails(campaignId, token);
        setcampaignDetails(campaignDetails);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchUserDetails();
    fetchCampaignDetails();
  }, [token]);


  return (
    <div className="dm-hub-page">
      <div className="dm-hub-container">
        <h1>Dungeon Master's Hun</h1>


        {campaignDetails.map((campaigndetail) => (
          <div key={campaigndetail.id} className="campaign-detail">
            {campaignDetails.gameMaster.map((gameMaster) =>
              <div key={gameMaster.id} className="game-master">
                <h3> Welcome to {campaignDetail.title}! Hosted by {gameMaster.username}</h3>
                )}
                <h3>{campaigndetail.players}</h3>

                <button>Invite</button>
                <button>Add Note</button>
                <p>{campaignDetail.description}</p>
              </div>
            ))}
          </div>
          </div>
    </div>
      );
};


      export default DmHub;