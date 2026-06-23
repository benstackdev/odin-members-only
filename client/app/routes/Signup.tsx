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
  const [isAdmin, setIsAdmin] = useState(false);
  const [signupError, setSignupError] = useState<string | undefined>();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, isAdmin } as UserType & { isAdmin: boolean; })
    });

    if (!res.ok) {
      const data = await res.json();
      setSignupError(data.error);
      return;
    }

    navigate("/signup/success");
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
          <input type="text" name="username" id="username" className={inputStyle} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
        </div>
        <div className={formRowStyle}>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </div>
        <div className={formRowStyle}>
          <label
            className={`flex items-center gap-2`}
            htmlFor="isAdmin">Admin user:
            <input type="checkbox" id="isAdmin" name="isAdmin" onChange={(e) => setIsAdmin(e.target.checked)} />
          </label>
        </div>
        <button className={submitButtonStyle} type="submit">Sign Up</button>
      </Form>
      <BackHomeButton />
    </div>
  );
};

export default Signup;