import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails, createNote } from "../api/api";
import MyMap from "../components/mymap";
import NotesList from "../components/notesList";
import NoNotes from "../components/noNotes";

const DmHub = () => {

  const [userDetails, setUserDetails] = useState({});
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [newNoteData, setNewNoteData] = useState({
    content: "",
    userId: "",
    campaignId: "",
  });
  
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

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!token) return;


    try {
      const noteData = {
        content: newNoteData.content,
        userId: userDetails.id,
        campaignId: campaignDetails.id,
      };

      const newNote = await createNote(noteData, token);
      console.log("Note created:", newNote);
    } catch (error) {
      console.error("Error creating note:", error.response?.data?.error || "Failed to create note");
    }
    location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNoteData((prev) => ({ ...prev, [name]: value }));

  };

  if (campaignDetails.length === 0) {
    return <p>Loading</p>
}
if (userDetails.length === 0) {
  return <p>Loading</p>
}
  console.log(userDetails.notes.length)
return (
  <div className="dm-hub-page">
    <div className="dm-hub-container">
      <h1>Dungeon Master's Hub</h1>
      <h3>Welcome to {campaignDetails?.title}! Hosted by {userDetails?.username}</h3>
      
      <div className="content-wrapper">
        <div className="player-list">
          <h4>Players</h4>
          <ul>
            {campaignDetails?.players.map(player => (
              <li key={player.id}>{player.username}</li>
            ))}
          </ul>
          <button>Invite</button>
          <h4>My Notes</h4>
           { userDetails.notes.length ? <NotesList /> :
            <NoNotes />}
          <p>{campaignDetails.description}</p>
       
        </div>
        <h4>Add note</h4>
          <form onSubmit={handleCreateNote} className="create-note-form">
            
              <label>Type note here</label>
              <input
                id="content"
                name="content"
                type="text"
                value={newNoteData.content}
                onChange={handleChange}
                required
              />
            <button type="submit">Create note</button>
          </form>
        <div className="map-position">
          <MyMap />
        </div>
      </div>
    </div>
  </div>
);
}
export default DmHub;