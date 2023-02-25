import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusIcon, PackageIcon, HomeIcon } from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";
import SidePanelToggle from "../SidePanelToggle";
import "./style.css";

const NavbarMobile = () => {
  const { pathname } = useLocation();
  const { currentUserInfo: user } = useContext(UserContext);

  return (
    <>
      {user && (
        <>
          <div className="divider-line theme-transition"></div>
          <nav className="navbar-mobile container-row theme-transition">
            <SidePanelToggle disable={pathname === "/"} mobileHidden={false} />
            <Link
              alt="Create Cube"
              className="btn mobile-navbar-item theme-transition"
              to="/dashboard/new">
              <PlusIcon size={16} />
              Create Cube
            </Link>
            <Link alt="About" className="btn mobile-navbar-item theme-transition" to="/">
              <HomeIcon size={16} />
              About
            </Link>
            <Link
              alt="Dashboard"
              className="btn mobile-navbar-item theme-transition"
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
