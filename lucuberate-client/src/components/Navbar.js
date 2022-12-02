import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PersonFillIcon,
} from "@primer/octicons-react";

import SignUpBtn from "./Auth/SignUpBtn";
import LoginBtn from "./Auth/LoginBtn";
import Logout from "./Auth/Logout";
import ThemeSwitch from "./ThemeSwitch";
import CategoryListToggle from "./CubeListCtrl/CategoryListToggle";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
        <>
          {pathname !== "/" && (
            <div className="mobile-hidden">
              <CategoryListToggle />
            </div>
          )}
          <div className="about-settings container-row">
            {pathname !== "/" && (
              <Link
                className="btn navbar-item about-dash theme-transition"
                to="/">
                About Lucuberate
                <ChevronRightIcon size={16} />
              </Link>
            )}
            {pathname === "/" && (
              <Link
                className="btn navbar-item about-dash theme-transition"
                to="#"
                onClick={() => navigate(-1)}>
                Back to dashboard
                <ChevronRightIcon size={16} />
              </Link>
            )}
            <div
              ref={userBtnRef}
              className="container-row dropdown theme-transition">
              <button
                onClick={toggleUserMenu}
                title={`${user.username}'s settings`}
                className="btn navbar-item username theme-transition dropbtn">
                <PersonFillIcon size={16} />
                &nbsp;{user.username}
                {showUserMenu ? (
                  <ChevronDownIcon size={16} />
                ) : (
                  <ChevronRightIcon size={16} />
                )}
              </button>
              {showUserMenu && (
                <div className="dropdown-content theme-transition">
                  <div className="dropdown-item theme-transition">
                    <label htmlFor="theme-switch">Theme</label>
                    <ThemeSwitch />
                  </div>
                  <div className="dropdown-item theme-transition">
                    <Logout setShowUserMenu={setShowUserMenu} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
