import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
const NoNotes = () => {

const [userDetails, setUserDetails] = useState({});

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

  fetchUserDetails();

}, [token]);

const notes = userDetails?.notes || [];

if (!userDetails?.id) {
    return <p>Loading</p>; 
  }

  return notes.length ? (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ))}
    </ul>
  ) : (
    <p>You don't have any notes</p>
  );
};
export default NoNotes;
 