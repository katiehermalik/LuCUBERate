import { useContext } from "react";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { CategoryListContext } from "../../context/ContextProvider";
import "./style.css";

const SidePanelToggle = () => {
  const { showSidePanel, setShowSidePanel } = useContext(CategoryListContext);

  const handleOpenCategoryList = () => {
    setShowSidePanel(prevState => !prevState);
  };

  return (
    <div className="toggle-list-btn-container">
      <button
        type="button"
        onClick={handleOpenCategoryList}
        className="btn navbar-item nav-link toggle-list-btn theme-transition"
        title={showSidePanel ? "Hide side panel" : "Show side panel"}
        aria-label={showSidePanel ? "Hide side panel" : "Show side panel"}>
        {showSidePanel ? <XIcon size={16} /> : <ThreeBarsIcon size={16} />}
      </button>
    </div>
  );
};

export default SidePanelToggle;
