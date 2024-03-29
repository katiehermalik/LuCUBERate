import { useContext } from "react";
import { LayoutContext, UserContext } from "../../context/ContextProvider";
import NewCubeBtn from "./NewCubeBtn";
import CategoryAndCubeList from "./CategoryAndCubeList";
import "./style.css";

function SidePanel() {
  const { showSidePanel } = useContext(LayoutContext);
  const { currentUserInfo } = useContext(UserContext);

  return (
    <div
      className={`cube-list-ctrl container-column ${
        showSidePanel ? "open" : ""
      }`}>
      <div className="cube-header container-row mobile-hidden">
        <NewCubeBtn />
      </div>
      {currentUserInfo && <CategoryAndCubeList />}
    </div>
  );
}

export default SidePanel;
