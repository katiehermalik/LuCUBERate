import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LayoutContext, UserContext } from "../../context/ContextProvider";
import CategoryListToggle from "../SidePanelToggle/component";
import NewCubeBtn from "../SidePanel/NewCubeBtn/component";
import "./style.css";

const NavbarMobile = () => {
  const { pathname } = useLocation();
  const { currentUserInfo: user } = useContext(UserContext);
  const { showSidePanel } = useContext(LayoutContext);

  return (
    <>
      {user && pathname !== "/" && (
        <>
          <div className="divider-line theme-transition"></div>
          <nav className="navbar navbar-mobile container-row theme-transition">
            <CategoryListToggle />
            {showSidePanel && (
              <div className="container-row">
                <NewCubeBtn />
              </div>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default NavbarMobile;
