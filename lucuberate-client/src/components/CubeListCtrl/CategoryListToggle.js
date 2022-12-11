import { useContext } from "react";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { CategoryListContext } from "../../context/ContextProvider";

const CategoryListToggle = () => {
  const { showCategoryList, setShowCategoryList } =
    useContext(CategoryListContext);

  const handleOpenCategoryList = () => {
    setShowCategoryList(prevState => !prevState);
  };

  return (
    <div className="toggle-list-btn-container">
      <button
        type="button"
        onClick={handleOpenCategoryList}
        className="btn navbar-item nav-link toggle-list-btn theme-transition"
        title={showCategoryList ? "Hide category list" : "Show category list"}
        aria-label={
          showCategoryList ? "Hide category list" : "Show category list"
        }>
        {showCategoryList ? <XIcon size={16} /> : <ThreeBarsIcon size={16} />}
      </button>
    </div>
  );
};

export default CategoryListToggle;
