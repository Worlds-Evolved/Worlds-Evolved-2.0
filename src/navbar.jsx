import React from "react"
import { Link } from "react-router-dom"


const NavBar = () => {
  return(
    <nav className ="parchment-nav">

        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dmhub">Dm Hub</Link>
        <Link to="/account">Account</Link>
    </nav>
  )
}

export default NavBar