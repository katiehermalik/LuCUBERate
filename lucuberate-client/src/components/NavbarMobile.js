import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CategoryListContext } from "../context/ContextProvider";
import CategoryListToggle from "./CubeListCtrl/CategoryListToggle";
import NewCubeBtn from "./CubeListCtrl/NewCubeBtn";

const NavbarMobile = ({ user }) => {
  const { pathname } = useLocation();
  const { showCategoryList } = useContext(CategoryListContext);

  return (
    <>
      {user && pathname !== "/" && (
        <>
          <div className="divider-line theme-transition"></div>
          <nav className="navbar navbar-mobile container-row theme-transition">
            <CategoryListToggle />
            {showCategoryList && (
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
