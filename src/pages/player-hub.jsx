import React, { useEffect, useState } from "react";
import { getCampaignDetails, getUserDetails, createNote } from "../api/api";

const PlayerHub = () => {

  const [userDetails, setUserDetails] = useState(null);
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
        const campaignDetails = await getCampaignDetails(10, token);
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
  return (
    <div className="dm-hub-page">
      <div className="dm-hub-container">
        <h1>{userDetails?.username}'s  Player Hub</h1>


        <div>
          <div>

            <h3> Welcome to {campaignDetails?.title}! Hosted by {campaignDetails?.gameMaster.username}</h3>
          </div>

          <h4>Players</h4>
          {campaignDetails?.players.map(player => {
            return <li>{player.username}</li>
          })}

          <h4>My Notes</h4>
          <ol>
            {userDetails?.notes.map(note => {
              return <li>{note.content}</li>
            })}
          </ol>
          <h4>Add note</h4>
          <form onSubmit={handleCreateNote} className="create-note-form">
            <div>
              <label>Type note here</label>
              <input
                id="content"
                name="content"
                type="text"
                value={newNoteData.content}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Create note</button>
          </form>
          <p>{campaignDetails.description}</p>
        </div>
      </div>
    </div>

  );

};
export default PlayerHub;
