import { heading1Style, heading2Style, inputStyle, messageItemStyle, messageListStyle, submitButtonStyle } from "~/styles/styleTemplates";
import BackHomeButton from "./BackHomeButton";
import { Form } from "react-router";
import { SERVER_URL } from "~/routes/Home";
import type { MessageType } from "~/types/MessageType.type";
import { useEffect, useState } from "react";

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

const MessageBoardLayout = ({ authUsername }: { authUsername: string | null; }) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncLoadMessages = async () => {
      setMessageList(await loadMessages());
      setLoading(false);
    };

    if (loading) asyncLoadMessages();
  }, [messageList, loading]);

  console.log(messageList);

  return (
    <>
      <h1 className={heading1Style}>Message Board</h1>
      <h2 className={heading2Style}>Welcome {authUsername}</h2>
      <Form className={`flex justify-around md:justify-center md:gap-4`}>
        <div className="">
          <label htmlFor="newMessage">Enter message: </label>
          <input className={inputStyle} type="text" id="newMessage" name="newMessage" />
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
                  <Form className="flex gap-4">
                    {/* TODO: Only admins should have this button enabled */}
                    <button className={submitButtonStyle} type="submit">Delete</button>
                  </Form>
                </li>
              );
            })
        }
      </ul>
      <BackHomeButton />
    </>
  );
};

export default MessageBoardLayout;