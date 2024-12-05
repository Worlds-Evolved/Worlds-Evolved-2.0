import React from "react";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await registerUser(userData);

    } catch (err) {
      console.log('error');
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