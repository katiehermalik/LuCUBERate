import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  UserContext,
  CategoryContext,
  CubeContext,
} from "../../../../../context/ContextProvider";

const PlaceholderCube = ({
  checkPlaceholder,
  currentCubeCategory,
  currentPath,
}) => {
  const { pathname } = useLocation();
  const { currentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);
  const {
    currentUserInfo: { categories },
  } = useContext(UserContext);
  const [renderPlaceholder, setRenderPlaceholder] = useState(false);
  const [currentCategoryData, setCurrentCategoryData] = useState({});
  // Renders a + placeholder cube in a category cube list when considering that category for a new cube or for editing and moving an existing cube to.
  useEffect(() => {
    if (currentCategory) {
      if (
        currentPath[0] === "new" ||
        (currentPath[0] === "edit" && currentCubeCategory !== currentCategory)
      ) {
        setRenderPlaceholder(true);
        checkPlaceholder(true);
        setCurrentCategoryData(
          categories.find(category => category._id === currentCategory)
        );
      } else {
        setRenderPlaceholder(false);
        checkPlaceholder(false);
      }
    }
  }, [
    checkPlaceholder,
    currentCategory,
    categories,
    currentCubeId,
    currentPath,
    pathname,
    currentCubeCategory,
  ]);

  return (
    <>
      {renderPlaceholder && (
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

export default PlaceholderCube;
