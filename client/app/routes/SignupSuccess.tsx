import { NavLink } from "react-router";
import { heading1Style, homeLinkStyle } from "~/styles/styleTemplates";

const SignupSuccess = () => {
  return (
    <>
      <h1 className={heading1Style}>Signup successful!</h1>
      <div className={`flex justify-center ${homeLinkStyle} mx-auto`}>
        <NavLink to="/login">Go to login</NavLink>
      </div>
    </>
  );
};

export default SignupSuccess;