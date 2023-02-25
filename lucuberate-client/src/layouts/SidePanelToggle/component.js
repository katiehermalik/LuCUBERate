import { useContext } from "react";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { LayoutContext } from "../../context/ContextProvider";
import "./style.css";

const SidePanelToggle = ({ disable, mobileHidden }) => {
  const { showSidePanel, setShowSidePanel } = useContext(LayoutContext);

  const handleOpenCategoryList = () => {
    setShowSidePanel(prevState => !prevState);
  };

  return (
    <button
      disabled={disable}
      style={{ opacity: `${disable ? "0.2" : "1"}` }}
      type="button"
      onClick={handleOpenCategoryList}
      className={`btn toggle-list-btn theme-transition ${
        mobileHidden ? "mobile-hidden navbar-item" : "mobile-navbar-item"
      } ${showSidePanel ? "selected" : ""}`}
      title={showSidePanel ? "Hide side panel" : "Show side panel"}
      aria-label={showSidePanel ? "Hide side panel" : "Show side panel"}>
      {showSidePanel ? (
        <XIcon size={`${mobileHidden ? "24" : "16"}`} />
      ) : (
        <ThreeBarsIcon size={`${mobileHidden ? "24" : "16"}`} />
      )}
      &nbsp;&nbsp;Cube List
    </button>
  );
};

export default SidePanelToggle;
