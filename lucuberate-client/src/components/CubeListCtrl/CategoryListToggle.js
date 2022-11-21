import React, { useContext } from "react";
import { CategoryListContext } from "../../context/ContextProvider";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";

const CategoryListToggle = () => {
  const { showCategoryList, setShowCategoryList } =
    useContext(CategoryListContext);

  const handleOpenCategoryList = () => {
    setShowCategoryList(prevState => !prevState);
  };

  return (
    <button
      type="button"
      onClick={handleOpenCategoryList}
      className="btn navbar-item nav-link toggle-list theme-transition"
      title={showCategoryList ? "Hide category list" : "Show category list"}
      aria-label={
        showCategoryList ? "Hide category list" : "Show category list"
      }>
      {showCategoryList ? <XIcon size={16} /> : <ThreeBarsIcon size={16} />}
    </button>
  );
};

export default CategoryListToggle;
