import { useContext } from "react";
import {
  CategoryListContext,
  UserContext,
} from "../../context/ContextProvider";
import NewCubeBtn from "./NewCubeBtn";
import CubeList from "./CubeList";

function CubeListCtrl() {
  const { showCategoryList } = useContext(CategoryListContext);
  const { currentUserInfo } = useContext(UserContext);

  return (
    <div
      className={`cube-list-ctrl container-column theme-transition ${
        showCategoryList ? "active" : ""
      }`}>
      <div className="cube-header container-row theme-transition mobile-hidden">
        <NewCubeBtn />
      </div>
      {currentUserInfo && <CubeList />}
    </div>
  );
}

export default CubeListCtrl;
