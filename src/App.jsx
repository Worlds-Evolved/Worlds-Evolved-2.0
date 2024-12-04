import React from "react"
import { Routes, Route } from "react-router-dom"
import NavBar from "./Navbar"


const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
