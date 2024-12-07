import React from "react";
import { useState } from "react";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await registerUser(userData);

      const token = await response.json();
      if (response.ok) {
        const accessToken = token.access_token;
        setToken(accessToken);
        localStorage.setItem('token', accessToken);

      } else {
        console.log('Registration Failed: ')
      }
    } catch (err) {
      console.log('Error during registration');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>

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

  )
};
export default Register