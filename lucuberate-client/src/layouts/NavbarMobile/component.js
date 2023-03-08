import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusIcon, PackageIcon, HomeIcon } from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";
import SidePanelToggle from "../SidePanelToggle";
import "./style.css";

const NavbarMobile = () => {
  const { currentUserInfo: user } = useContext(UserContext);
  const { pathname } = useLocation();
  const params = pathname.split("/");
  const currentPage = params[1];

  return (
    <>
      {user && (
        <>
          <div className="divider-line"></div>
          <nav className="navbar-mobile container-row">
            <SidePanelToggle disable={pathname === "/"} mobileHidden={false} />
            <Link
              style={{
                pointerEvents: `${pathname === "/" ? "none" : ""}`,
                color: `${
                  pathname === "/"
                    ? "var(--mobile-nav-item-disabled)"
                    : params[2] === "new"
                    ? "var(--mobile-nav-item-select)"
                    : "var(--text-color-light)"
                }`,
              }}
              alt="Create Cube"
              className="btn mobile-navbar-item"
              to="/dashboard/new">
              <PlusIcon size={16} />
              Create Cube
            </Link>
            <Link
              alt="About"
              className={`btn mobile-navbar-item ${
                pathname === "/" ? "selected" : ""
              }`}
              to="/">
              <HomeIcon size={16} />
              About
            </Link>
            <Link
              alt="Dashboard"
              className={`btn mobile-navbar-item ${
                currentPage === "dashboard" && pathname !== "/dashboard/new"
                  ? "selected"
                  : ""
              }`}
              to="/dashboard/instructions">
              <PackageIcon size={16} />
              Dashboard
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default NavbarMobile;
