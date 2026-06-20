import { formRowStyle, heading1Style, inputStyle, submitButtonStyle } from "~/styles/styleTemplates";
import { SERVER_URL } from "./Home";
import { createCookie, Form, useNavigate } from "react-router";
import { useState } from "react";
import type { UserType } from "~/types/UserType.type";

const loginUser = async (userData: UserType) => {
  try {
    const tokenData = await fetch(`${SERVER_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return JSON.stringify(tokenData);
  } catch (error) {
    throw error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser({ username, password } as UserType);
    navigate("/message-board");
  };

  return (
    <div className="flex flex-col justify-center">
      <header>
        <h1 className={heading1Style}>Login</h1>
      </header>
      <Form className={`flex flex-col items-center`}
        onSubmit={handleSubmit}>
        <div className={formRowStyle}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" className={inputStyle} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className={formRowStyle}>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className={inputStyle} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className={submitButtonStyle} type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;