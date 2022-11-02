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
    <form onSubmit={handleSubmit}>
      <button
        className="btn navbar-item theme-transition"
        type="submit"
        title="log out">
        Log Out&ensp;
        <SignOutIcon size={16} />
      </button>
    </form>
  );
};

export default withRouter(Logout);
