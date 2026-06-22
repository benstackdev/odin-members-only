import Cookies from 'js-cookie';
import { SERVER_URL } from './Home';
import { useEffect, useState, createContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import MessageBoardLayout from '~/components/MessageBoardLayout';

const requestWithToken = async (token: string, relativePath: string) => {
  return fetch(`${SERVER_URL}/api/auth/${relativePath}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const UserContext = createContext<string | null>(null);

const MessageBoard = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean>();
  const [authUsername, setAuthUsername] = useState<string | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const verify = async () => {
      if (token) {
        const res = await requestWithToken(token, "verify");
        setAuthorized((res.status === 200));
        if (authorized) {
          const resData = await res.json();
          setAuthUsername(resData.payload.username);
        }
        setLoading(false);
      } else {
        setAuthorized(false);
        setLoading(false);
      }
    };

    verify();
  }, [authorized, authUsername, loading]);

  if (!loading) {
    if (authorized) {
      return (
        <MessageBoardLayout authUsername={authUsername} />
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