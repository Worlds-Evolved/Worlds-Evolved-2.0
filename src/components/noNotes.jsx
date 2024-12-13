import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
const NoNotes = () => {

const [userDetails, setUserDetails] = useState([]);

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

if (userDetails.length === 0) {
  return <p>Loading</p>
}

console.log(userDetails?.notes.map(note => {
  return <li key={note.id}>{note.content}</li>
}))


return (
  <p>You don't have any notes</p>
)
}
export default NoNotes;
 