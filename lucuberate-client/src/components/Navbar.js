import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { ChevronRightIcon, PersonFillIcon } from "@primer/octicons-react";

import SignUpBtn from "./Auth/SignUpBtn";
import LoginBtn from "./Auth/LoginBtn";
import Logout from "./Auth/Logout";
import ThemeSwitch from "./ThemeSwitch";
import CategoryListToggle from "./CubeListCtrl/CategoryListToggle";

const Navbar = ({ user }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBtnRef = useRef();

  useEffect(() => {
    const closeUserMenu = e => {
      if (
        userBtnRef.current &&
        (!userBtnRef.current.contains(e.target) ||
          userBtnRef.current === e.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", closeUserMenu);
  }, []);

  const toggleUserMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserMenu(prevState => !prevState);
  };

  return (
    <nav className="navbar container-row theme-transition">
      {user && (
        <div className="container-row">
          {window.location.pathname !== "/" && (
            <>
              <div className="mobile-hidden">
                <CategoryListToggle />
              </div>
              <Link className="btn navbar-item theme-transition" to="/">
                About LuCUBERate
              </Link>
            </>
          )}
          {window.location.pathname === "/" && (
            <Link className="btn navbar-item theme-transition" to="/dashboard">
              Back to dashboard
              <ChevronRightIcon size={16} />
            </Link>
          )}
        </div>
      )}
      {!user && (
        <div className="signup-login container-row">
          <SignUpBtn
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
            setShowLoginModal={setShowLoginModal}
          />
          <LoginBtn
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            setShowSignUpModal={setShowSignUpModal}
          />
        </div>
      )}
      {user && (
        <div
          ref={userBtnRef}
          className="container-row dropdown theme-transition">
          <button
            onClick={toggleUserMenu}
            className="navbar-item username theme-transition dropbtn">
            <PersonFillIcon size={16} /> {user.username}
          </button>
          {showUserMenu && (
            <div className="dropdown-content theme-transition">
              <div className="dropdown-item theme-transition">
                <p>Theme</p>
                <ThemeSwitch />
              </div>
              <div className="dropdown-item theme-transition">
                <Logout setShowUserMenu={setShowUserMenu} />
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
