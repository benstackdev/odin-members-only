import { heading1Style } from "~/styles/styleTemplates";
import BackHomeButton from "./BackHomeButton";

const MessageBoardLayout = ({ authUsername }: { authUsername: string | null; }) => {

  return (
    <>
      <h1 className={heading1Style}>Message Board</h1>
      <p>Welcome {authUsername}</p>
      <BackHomeButton />
    </>
  );
};

export default MessageBoardLayout;