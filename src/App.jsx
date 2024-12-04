import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home"; 

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;