import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn && token) {
      try {
        const decodedToken = jwtDecode(token);  
        setIsAdmin(decodedToken?.role === "ADMIN");
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setIsAdmin(false); 
    }
  }, [isLoggedIn, token]);


  return(
    <nav className ="parchment-nav">

        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/account">Account</Link>}
        {isLoggedIn && <Link to="/dmhub">Dm Hub</Link>}
        {isLoggedIn && <Link to="/playerhub">Players Hub</Link>}
        {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}
    </nav>
  )
}

export default NavBar