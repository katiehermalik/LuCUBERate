import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { ChevronRightIcon } from "@primer/octicons-react";

import SignUpBtn from "./Auth/SignUpBtn";
import LoginBtn from "./Auth/LoginBtn";
import Logout from "./Auth/Logout";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = ({ user, auth }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <nav className="navbar container-row theme-transition">
      {user && (
        <div className="container-row">
          {window.location.pathname !== "/" && (
            <>
              <Link className="btn navbar-item theme-transition" to="/">
                About LuCUBERate
              </Link>
            </>
          )}
          {window.location.pathname === "/" && (
            <Link
              className="btn navbar-item theme-transition"
              to="/dashboard">
              Back to dashboard
              <ChevronRightIcon size={16} />
            </Link>
          )}
          <ThemeSwitch />
        </div>
      )}
      {!user && (
        <div className="signup-login container-row">
          <SignUpBtn
            auth={auth}
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
            setShowLoginModal={setShowLoginModal}
          />
          <LoginBtn
            auth={auth}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            setShowSignUpModal={setShowSignUpModal}
          />
        </div>
      )}
      {user && (
        <div className="container-row">
          <div className="navbar-item username theme-transition">
            {user.currentUser.username}
          </div>
          <Logout logout={auth} />
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
