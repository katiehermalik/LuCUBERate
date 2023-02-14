import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CategoryListContext } from "../../context/ContextProvider";
import CategoryListToggle from "../SidePanelToggle/component";
import NewCubeBtn from "../SidePanel/NewCubeBtn/component";

const NavbarMobile = ({ user }) => {
  const { pathname } = useLocation();
  const { showSidePanel } = useContext(CategoryListContext);

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
