import React, { useContext } from "react";
import { CategoryListContext } from "../../context/ContextProvider";
import CubeHeader from "./CubeHeader";
import CubeList from "./CubeList";

function CubeListCtrl() {
  const { showCategoryList } = useContext(CategoryListContext);

  return (
    <>
      {showCategoryList && (
        <div className="cube-list-ctrl container-column theme-transition">
          <CubeHeader />
          <CubeList />
        </div>
      )}
    </>
  );
}

export default CubeListCtrl;
