import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  UserContext,
  CategoryContext,
  CubeContext,
} from "../../context/ContextProvider";

const PlaceHolderCube = ({
  checkPlaceHolder,
  currentCubeCategory,
  currentPath,
}) => {
  const { pathname } = useLocation();
  const { currentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);
  const {
    currentUserInfo: { categories },
  } = useContext(UserContext);
  const [renderPlaceHolder, setRenderPlaceHolder] = useState(false);
  const [currentCategoryData, setCurrentCategoryData] = useState({});
  // Renders a + placeholder cube in a category cube list when considering that category for a new cube or for editing and moving an existing cube to.
  useEffect(() => {
    if (currentCategory) {
      if (
        currentPath[0] === "new" ||
        (currentPath[0] === "edit" && currentCubeCategory !== currentCategory)
      ) {
        setRenderPlaceHolder(true);
        checkPlaceHolder(true);
        setCurrentCategoryData(
          categories.find(category => category._id === currentCategory)
        );
      } else {
        setRenderPlaceHolder(false);
        checkPlaceHolder(false);
      }
    }
  }, [
    checkPlaceHolder,
    currentCategory,
    categories,
    currentCubeId,
    currentPath,
    pathname,
    currentCubeCategory,
  ]);

  return (
    <>
      {renderPlaceHolder && (
        <li className="radio-button">
          <input type="radio" id={"new_cube"} checked={true} readOnly={true} />
          <label className="radio-label" htmlFor={"new_cube"}>
            {`+ Cube ${currentCategoryData.cubes.length + 1}`}
          </label>
        </li>
      )}
    </>
  );
};

export default PlaceHolderCube;
