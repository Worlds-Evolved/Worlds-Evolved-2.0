import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";
import ApiTest from "./api/api-test";
import Login from "./pages/login";
import AccountPage from "./pages/account-details";
import Register from "./pages/register";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
};

export default App;