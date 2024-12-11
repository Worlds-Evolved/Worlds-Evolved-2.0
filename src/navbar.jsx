import React from "react"
import { Link } from "react-router-dom"


const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return(
    <nav class ="parchment-nav">

        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {isLoggedIn && <Link to="/account">Account</Link>}
    </nav>
  )
}

export default NavBar