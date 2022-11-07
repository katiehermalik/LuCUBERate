import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";

const Logout = ({ history, toggleUserMenu }) => {
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);

  const handleSubmit = e => {
    setCurrentUserInfo(null);
    localStorage.clear();
    history.push("/");
    // toggleUserMenu(e);
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
