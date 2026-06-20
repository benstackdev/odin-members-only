import { errorStyle, formRowStyle, heading1Style, inputStyle, submitButtonStyle } from "~/styles/styleTemplates";
import { SERVER_URL } from "./Home";
import { createCookie, Form, useNavigate } from "react-router";
import { useState } from "react";
import type { UserType } from "~/types/UserType.type";
import BackHomeButton from "~/components/BackHomeButton";

const loginUser = async (userData: UserType) => {
  const res = await fetch(`${SERVER_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return error;
  }

  const data = await res.json();
  return data;
};

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | undefined>();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginStatus = await loginUser({ username, password } as UserType);

    if (loginStatus.error) {
      // handle the error and don't navigate
      setLoginError(loginStatus.error);
      return;
    }

    navigate("/message-board");
  };

  return (
    <div className="flex flex-col justify-center">
      <header>
        <h1 className={heading1Style}>Login</h1>
      </header>
      <div className={errorStyle}>
        {loginError ? `Login error: ${loginError}` : null}
      </div>
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
      <BackHomeButton />
    </div>
  );
};

export default Login;