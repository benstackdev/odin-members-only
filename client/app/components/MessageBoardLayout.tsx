import { heading1Style, heading2Style, inputStyle, messageItemStyle, messageListStyle, submitButtonStyle } from "~/styles/styleTemplates";
import BackHomeButton from "./BackHomeButton";
import { Form } from "react-router";
import { SERVER_URL } from "~/routes/Home";
import type { MessageType } from "~/types/MessageType.type";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const loadMessages = async () => {
  const res = await fetch(`${SERVER_URL}/api/messages/get-messages`, {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return error;
  }

  const data = await res.json();
  return data;
};

const addMessage = async (username: string, message: string) => {
  const token = Cookies.get("token");

  const res = await fetch(`${SERVER_URL}/api/messages/add-message`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ username, message })
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return error;
  }

  const data = await res.json();
  return data;
};

const deleteMessage = async (messageObject: MessageType) => {
  const token = Cookies.get("token");

  const res = await fetch(`${SERVER_URL}/api/messages/delete-message`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      username: messageObject.authorid,
      message: messageObject.message
    })
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return error;
  }

  const data = await res.json();
  console.log(data);
  return data;
};

const MessageBoardLayout = ({ authUsername, isAdmin }: { authUsername: string | null, isAdmin: boolean | null; }) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncLoadMessages = async () => {
      setMessageList(await loadMessages());
      setLoading(false);
    };

    if (loading) asyncLoadMessages();
  }, [messageList, loading]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authUsername) {
      await addMessage(authUsername, userMessage);
      setUserMessage('');
      setLoading(true);
    }
  };

  const handleDeleteMessageSubmit = async (event: React.SubmitEvent<HTMLFormElement>, message: MessageType) => {
    event.preventDefault();
    if (isAdmin) {
      await deleteMessage(message);
      setLoading(true);
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center`}>
      <h1 className={heading1Style}>Message Board</h1>
      <h2 className={heading2Style}>Welcome {authUsername}</h2>
      {isAdmin ? <p>You are an admin</p> : <p>You are a user</p>}
      <Form
        className={`flex justify-around md:justify-center md:gap-4`}
        onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="newMessage">Enter message: </label>
          <input className={inputStyle} type="text" id="newMessage" name="newMessage" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
        </div>
        <button className={submitButtonStyle} type="submit">Send</button>
      </Form>
      <ul className={messageListStyle}>
        {
          loading ? <li>Loading...</li> :
            messageList.map(message => {
              return (
                <li className={messageItemStyle} key={message.posted}>
                  <p>{message.authorname}: {message.message}</p>
                  <Form className="flex gap-4"
                    onSubmit={async (e: React.SubmitEvent<HTMLFormElement>) => await handleDeleteMessageSubmit(e, message)}>
                    <button
                      className={submitButtonStyle}
                      type="submit"
                      disabled={!isAdmin}>
                      Delete
                    </button>
                  </Form>
                </li>
              );
            })
        }
      </ul>
      <BackHomeButton />
    </div>
  );
};

export default MessageBoardLayout;