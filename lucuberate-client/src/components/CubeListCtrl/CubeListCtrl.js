import React, { useContext } from "react";
import {
  CategoryListContext,
  UserContext,
} from "../../context/ContextProvider";
import CubeHeader from "./CubeHeader";
import CubeList from "./CubeList";

function CubeListCtrl() {
  const { showCategoryList } = useContext(CategoryListContext);
  const { currentUserInfo } = useContext(UserContext);

  return (
    <div
      className={`cube-list-ctrl container-column theme-transition ${
        showCategoryList ? "active" : ""
      }`}>
      <CubeHeader />
      {currentUserInfo && <CubeList />}
    </div>
  );
}

export default CubeListCtrl;
