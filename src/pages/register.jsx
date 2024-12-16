import React, { useState } from "react";
import { registerUser } from "../api/api";
import './logres.css'

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await registerUser(userData);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
      } else {
        console.log('Registration failed');
      }
    } catch (err) {
      console.log('Error during registration', err);
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <h2>Register</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            <b>Username:</b>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input-field"
            />
          </label>
          <label>
            <b>Email:</b>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field"
            />
          </label>
          <label>
            <b>Password:</b>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
            />
          </label>
          <button className="submit-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;