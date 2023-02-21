import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  PersonFillIcon,
} from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";
import AuthBtn from "../../features/authentication/components/AuthBtn";
import Logout from "../../features/authentication/components/LogoutBtn/component";
import ThemeSwitch from "../../components/ThemeToggle/component";
import CategoryListToggle from "../SidePanelToggle/component";
import "./style.css";

const Navbar = () => {
  const { currentUserInfo: user } = useContext(UserContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBtnRef = useRef();
  const { pathname } = useLocation();

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
          <AuthBtn authType={"Sign Up"} />
          <AuthBtn authType={"Login"} />
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
            <Link
              className="btn navbar-item about-dash theme-transition"
              to={pathname === "/" ? "/dashboard/instructions" : "/"}>
              {pathname === "/" ? "Back to dashboard" : "About Lucuberate"}
              <ChevronRightIcon size={16} />
            </Link>
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
