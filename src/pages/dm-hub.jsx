import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails } from "../api/api";



const DmHub = () => {


  const [userDetails, setUserDetails] = useState(null);
  // console.log(userDetails)
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([])
  const [ulElement, setUlElement] = useState(null)
  
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
        const players = campaignDetails.players;
        setPlayers(players);
      
        const allPlayers = [];

        for (let i = 0; i < players.length; i++) {
          if (players[i].username) {
            allPlayers.push(players[i].username);
            setAllPlayers(allPlayers)
          }
        }

        const ulElement = document.createElement('ul');

        for (let i = 0; i < allPlayers.length; i++) {
          const liElement = document.createElement('li');
          liElement.textContent = allPlayers[i]; // Set the text content of <li>

          ulElement.appendChild(liElement);
        }
        setUlElement(ulElement);
      }

      catch (error) {
        console.error("Error fetching campaign details:", error);
      } getCampaignDetails(campaignId, token);
        setCampaignDetails(campaignDetails);

    };


    fetchUserDetails();
    fetchCampaignDetails();



  }, [token]);

  return (
    <div className="dm-hub-page">
      <div className="dm-hub-container">
        <h1>Dungeon Master's Hub</h1>


        <div>
          <div>

            <h3> Welcome to {campaignDetails?.title}! Hosted by {userDetails?.username}</h3>
          </div>

          <h4>players: {allPlayers}</h4>

{/* this is where I am trying to pul the UL with all the players in it to replace above line of code.
          {ulElement}
          {console.log(ulElement)} */}

          <button>Invite</button>
          <button>Add Note</button>
          <p>{campaignDetails.description}</p>
        </div>
      </div>
    </div>

  );

};

export default DmHub;
