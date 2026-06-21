import { heading1Style } from "~/styles/styleTemplates";
import BackHomeButton from "./BackHomeButton";
import { useContext } from "react";
import { UserContext } from "~/routes/MessageBoard";

const MessageBoardLayout = () => {
  const authUsername = useContext(UserContext);

  return (
    <>
      <h1 className={heading1Style}>Message Board</h1>
      <p>Welcome {authUsername}</p>
      <BackHomeButton />
    </>
  );
};

export default MessageBoardLayout;