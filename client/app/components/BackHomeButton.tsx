import { NavLink } from "react-router";
import { backHomeButtonStyle } from "~/styles/styleTemplates";

const BackHomeButton = () => {
  return (
    <div className="flex justify-center">
      <NavLink className={backHomeButtonStyle} to="/">Back Home</NavLink>
    </div>
  );
};

export default BackHomeButton;