import { useContext } from "react";
import {
  CategoryListContext,
  UserContext,
} from "../../context/ContextProvider";
import NewCubeBtn from "./NewCubeBtn";
import CategoryAndCubeList from "./CategoryAndCubeList";
import "./style.css"

function SidePanel() {
  const { showSidePanel } = useContext(CategoryListContext);
  const { currentUserInfo } = useContext(UserContext);

  return (
    <div
      className={`cube-list-ctrl container-column theme-transition ${
        showSidePanel ? "active" : ""
      }`}>
      <div className="cube-header container-row theme-transition mobile-hidden">
        <NewCubeBtn />
      </div>
      {currentUserInfo && <CategoryAndCubeList />}
    </div>
  );
}

export default SidePanel;
