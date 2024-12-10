import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import AccountPage from "./pages/account-details";
import Register from "./pages/register";
import MyMap from "./components/mymap";
import './App.css'


const App = () => {
  
  return (

    
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />    
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/mymap" element={<MyMap />} />
      </Routes>
    </>
  );
};

export default App;