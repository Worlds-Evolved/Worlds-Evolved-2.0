import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails } from "../api/api";
import MyMap from "../components/mymap";

const DmHub = () => {

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
  <div>
    <div className="dm-hub-container">
      <h1>Dungeon Master's Hub</h1>
      <h3>Welcome to {campaignDetails?.title}! Hosted by {userDetails?.username}</h3>
      <h4>Players</h4>
      <ul>
        {campaignDetails?.players.map(player => (
          <li key={player.id}>{player.username}</li>
        ))}
      </ul>
      <button>Invite</button>
      <button>Add Note</button>
      <p>{campaignDetails.description}</p>
    </div>

    <div className="map-position">
      <MyMap />
    </div>
  </div>
);
}
export default DmHub;
