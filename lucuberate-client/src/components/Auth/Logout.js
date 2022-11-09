import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";
import { UserContext, ThemeContext } from "../../context/ContextProvider";

const Logout = ({ history, toggleUserMenu }) => {
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setTheme } = useContext(ThemeContext);

  const handleSubmit = e => {
    setTheme("dark");
    setCurrentUserInfo(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <button
      onClick={handleSubmit}
      className="btn navbar-item logout-btn theme-transition"
      type="submit"
      title="log out">
      Log Out&ensp;
      <SignOutIcon size={16} />
    </button>
  );
};

export default withRouter(Logout);
