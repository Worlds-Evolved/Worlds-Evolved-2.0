import React from "react"
import { useState } from "react"
// import { loginUser } from ""

const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);
      if (response.token) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
      } else {
        console.log('Login failed');
      }
    } catch (err) {
      console.log('error');
    }
  };

  return (
    <div className="page-container">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email: 
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
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

export default Login