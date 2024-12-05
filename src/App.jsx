import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./pages/home"; 
import ApiTest from "./api/api";
import Login from "./pages/login";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;