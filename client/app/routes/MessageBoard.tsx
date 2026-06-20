import Cookies from 'js-cookie';
import { SERVER_URL } from './Home';

const verifyToken = async (token: string) => {
  const data = await fetch(`${SERVER_URL}/api/auth/verify`, {

  });
};

const MessageBoard = () => {

  // call verifyToken to verify on backend

  return (
    <div>Message board</div>
  );
};

export default MessageBoard;