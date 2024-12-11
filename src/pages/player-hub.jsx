import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails } from "../api/api";

const PlayerHub = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState([]);
  console.log(campaignDetails);
  
  const token = localStorage.getItem('token');
  if (!token) return;

  useEffect(() => {

    const fetchUserDetails = async () => {
      if (token) {
        try {
          const res = await getUserDetails(token);
          setUserDetails(res);
        } catch (error) {
          console.error("Error fetching user details:", error);

        }
      };
    }

    const fetchCampaignDetails = async () => {
      try {
        const campaignDetails = await getCampaignDetails(11, token);
        setCampaignDetails(campaignDetails)
      }
      catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };
    fetchUserDetails();
    fetchCampaignDetails();
  }, [token]);


  if (campaignDetails.length === 0) {
    return <p>Loading</p>
}
  return (
    <div className="dm-hub-page">
      <div className="dm-hub-container">
        <h1>Dungeon Master's Hub</h1>


        <div>
          <div>

            <h3> Welcome to {campaignDetails?.title}! Hosted by {userDetails?.username}</h3>
          </div>

    <h4>Players</h4>
    {campaignDetails?.players.map(player => {
      return <li>{player.username}</li>
    })}
          <button>Invite</button>
          <button>Add Note</button>
          <p>{campaignDetails.description}</p>
        </div>
      </div>
    </div>

  );

};
export default PlayerHub;
