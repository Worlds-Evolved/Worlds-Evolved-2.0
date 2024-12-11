import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import AccountPage from "./pages/account-details";
import Register from "./pages/register";
import DmHub from "./pages/dm-hub";
import MyMap from "./components/mymap";
import './App.css'



const App = () => {
  
  const [token, setToken] = useState("")

  return (

    
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/dmhub" element={<DmHub token={token}/>} />
        <Route path="/mymap" element={<MyMap />} />

      </Routes>
    </>
  );
};

export default App;