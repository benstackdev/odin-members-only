import { errorStyle, formRowStyle, heading1Style, inputStyle, submitButtonStyle } from "~/styles/styleTemplates";
import { SERVER_URL } from "./Home";
import { Form, useNavigate } from "react-router";
import { useState } from "react";
import type { UserType } from "~/types/UserType.type";
import BackHomeButton from "~/components/BackHomeButton";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState<string | undefined>();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password } as UserType)
    });

    if (!res.ok) {
      const data = await res.json();
      setSignupError(data.error);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center">
      <header>
        <h1 className={heading1Style}>Sign Up</h1>
      </header>
      <div className={errorStyle}>
        {signupError ? `Signup error: ${signupError}` : null}
      </div>
      <Form className={`flex flex-col items-center`}
        onSubmit={handleSubmit}>
        <div className={formRowStyle}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" className={inputStyle} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={formRowStyle}>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={submitButtonStyle} type="submit">Sign Up</button>
      </Form>
      <BackHomeButton />
    </div>
  );
};

export default Signup;