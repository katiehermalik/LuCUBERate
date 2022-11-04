import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { CategoryListContext } from "../context/ContextProvider";

import CategoryListToggle from "./CubeListCtrl/CategoryListToggle";
import ToggleQuestionsBtn from "./CubeListCtrl/ToggleQuestionsBtn";
import NewCubeBtn from "./CubeListCtrl/NewCubeBtn";

const NavbarMobile = ({ user, auth }) => {
  const { showCategoryList } = useContext(CategoryListContext);

  return (
    <>
      {user && window.location.pathname !== "/" && (
        <nav className="navbar navbar-mobile container-row theme-transition">
          <div className="container-row">
            <CategoryListToggle />
            {showCategoryList && (
              <>
                <NewCubeBtn />
                <ToggleQuestionsBtn />
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default withRouter(NavbarMobile);
