import { NavLink } from "react-router";
import { backHomeButtonStyle } from "~/styles/styleTemplates";

const BackHomeButton = () => {
  return (
    <div className={backHomeButtonStyle}>
      <NavLink to="/">Back Home</NavLink>
    </div>
  );
};

export default BackHomeButton;