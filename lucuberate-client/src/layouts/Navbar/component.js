import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PersonFillIcon,
  PackageIcon,
  HomeIcon,
} from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";
import AuthBtn from "../../features/authentication/components/AuthBtn";
import Logout from "../../features/authentication/components/LogoutBtn";
import ThemeSwitch from "../../components/ThemeToggle";
import SidePanelToggle from "../SidePanelToggle";
import "./style.css";

const Navbar = () => {
  const { currentUserInfo: user } = useContext(UserContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const userBtnRef = useRef();
  const { pathname } = useLocation();
  const params = pathname.split("/");
  const currentPage = params[1];

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
    return () => {
      document.addEventListener("mousedown", closeUserMenu);
    };
  }, []);

  const toggleUserMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserMenu(prevState => !prevState);
  };

  return (
    <nav
      className="navbar container-row theme-transition"
      style={{
        position: `${pathname === "/" ? "absolute" : ""}`,
        top: `${pathname === "/" ? "0" : ""}`,
        backgroundColor: `${
          pathname === "/" && !user ? "transparent" : "var(--nav-bg-color)"
        }`,
        justifyContent: `${pathname === "/" ? "flex-end" : "space-between"}`,
        WebkitBoxPack: `${pathname === "/" ? "end" : "justify"}`,
        msFlexPack: `${pathname === "/" ? "end" : "justify"}`,
      }}>
      {!user && (
        <div className="auth-btns-container">
          <div className="container-row">
            <AuthBtn authType={"Login"} />
            <AuthBtn authType={"Sign Up"} />
          </div>
        </div>
      )}
      {user && (
        <>
          {pathname !== "/" && <SidePanelToggle mobileHidden={true} />}
          <div className="about-settings container-row">
            <button
              onClick={() => navigate("/")}
              title="Settings"
              className={`btn navbar-item theme-transition mobile-hidden ${
                pathname === "/" ? "selected" : ""
              }`}>
              <HomeIcon size={16} />
              &nbsp;About
            </button>
            <button
              disabled={currentPage === "dashboard"}
              onClick={() => navigate("/dashboard")}
              title="Settings"
              className={`btn navbar-item theme-transition mobile-hidden ${
                currentPage === "dashboard" ? "selected" : ""
              }`}>
              <PackageIcon size={16} />
              &nbsp;Dashboard
            </button>
            <div
              ref={userBtnRef}
              className="container-row dropdown theme-transition">
              <button
                onClick={toggleUserMenu}
                title="Settings"
                className="btn navbar-item username theme-transition dropbtn">
                <PersonFillIcon size={16} />
                {showUserMenu ? (
                  <ChevronDownIcon size={16} />
                ) : (
                  <ChevronRightIcon size={16} />
                )}
              </button>
              {showUserMenu && (
                <div className="dropdown-content theme-transition">
                  <div className="dropdown-item theme-transition">
                    Signed in as
                    <br />
                    &nbsp;&nbsp;&nbsp;{user.username}
                  </div>
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
