import Cookies from 'js-cookie';
import { SERVER_URL } from './Home';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import BackHomeButton from '~/components/BackHomeButton';

const verifyToken = async (token: string) => {
  return fetch(`${SERVER_URL}/api/auth/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const MessageBoard = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean>();

  const token = Cookies.get("token");

  useEffect(() => {
    const verify = async () => {
      if (token) {
        const res = await verifyToken(token);
        setAuthorized((res.status === 200));
        setLoading(false);
      } else {
        setAuthorized(false);
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (!loading) {
    if (authorized) {
      return (
        <div className="">
          <h1>Message board</h1>
          <BackHomeButton />
        </div>
      );
    }
    return (
      // Should also have some error report back to user like "Login failed" or something
      <Navigate to="/login" />
    );
  }

  return (
    <div className="">Loading...</div>
  );
};

export default MessageBoard;