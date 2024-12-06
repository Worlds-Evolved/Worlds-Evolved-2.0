import React from "react"
import { useState } from "react"
import { loginUser } from "../api/api";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const credentials = { username, password };

    try {
      const response = await loginUser(credentials);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
      } else {
        console.log('Login failed');
      }
    } catch (err) {
      console.log('Error during login', err);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username: 
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            Password: 
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;