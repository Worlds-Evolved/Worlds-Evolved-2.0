import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails } from "../api/api";

const DmHub = () => {


  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails)
  const [campaignDetails, setcampaignDetails] = useState([]);


  const token = localStorage.getItem('token');
  if (!token) return;

  useEffect(() => {
    console.log(`hello`);

    const fetchUserDetails = async () => {
    if (token) {
      try {
        const res = await getUserDetails(token);
        setUserDetails(res);
        console.log(userDetails)
      } catch (error) {
        console.error("Error fetching user details:", error);

      }
    };}

    const fetchCampaignDetails = async () => {
      try {

        const campaignDetails = await getCampaignDetails(11, token)
        
        console.log(campaignDetails)
        setcampaignDetails(campaignDetails)
      }

      catch (error) {
        console.error("Error fetching campaign details:", error);
       }  getCampaignDetails(campaignId, token);
        setcampaignDetails(campaignDetails);
     };

     console.log(campaignDetails)

    fetchUserDetails();
   fetchCampaignDetails();



  }, [token]);
  const players = campaignDetails.players 

  console.log(players)
// const player1 = players[1]
console.log(typeof players)

  return (
    <div className="dm-hub-page">
      <div className="dm-hub-container">
        <h1>Dungeon Master's Hub</h1>

        {console.log(players)}

        <div>
          <div>

            <h3> Welcome to {campaignDetails?.title}! Hosted by {userDetails?.username}</h3>
          </div>

          {/* <h4>{campaignDetails.players[1]}</h4>  */}

          <button>Invite</button>
          <button>Add Note</button>
          {/* <p>{campaignDetails.description}</p> */}
        </div>
      </div>
    </div>

  );

};

export default DmHub;
