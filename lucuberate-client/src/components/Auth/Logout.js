import React from "react";
import { withRouter } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";

const Logout = ({ history, auth }) => {
  const handleSubmit = event => {
    history.push("/");
    localStorage.clear();
    auth({});
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
