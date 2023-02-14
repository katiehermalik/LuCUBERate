import { useContext } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@primer/octicons-react";
import {
  CurrentPathContext,
  CategoryContext,
  CubeContext,
} from "../../../../context/ContextProvider";
import QuestionsToggle from "./QuestionsToggle";
import CategoryShuffle from "./ShuffleCubes/component";
import CubeCount from "./CubeCount/component";
import DeleteBtn from "../DeleteBtn/component";

const CategoryCtrls = ({
  setCategoryWasShuffled,
  currentCubeCategory,
  currentCategoryRef,
  cubeRefsLength,
  cubeListLength,
  categoryTitle,
  categoryId,
}) => {
  const { currentPath } = useContext(CurrentPathContext);
  const { currentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);

  const changeCubeListOpacity = () => {
    currentCategoryRef.nextElementSibling.style.opacity = "0";
    setTimeout(() => {
      currentCategoryRef.nextElementSibling.style.opacity = "1";
    }, 1000);
  };

  return (
    <>
      {currentCategory === categoryId ? (
        <div className="cat-item category-btn-cover theme-transition">
          <span className="category-title">{`${categoryTitle}`}</span>
          <div className="category-options-grp container-row pointer-disabled">
            <CubeCount
              categoryCubeLength={cubeListLength}
              cubeListOpened={true}
            />
            <span className="container-row pointer-auto">
              <QuestionsToggle />
              {currentCubeId &&
                currentPath[0] === "show" &&
                currentCubeCategory === currentCategory &&
                cubeRefsLength > 1 && (
                  <CategoryShuffle
                    setCategoryWasShuffled={setCategoryWasShuffled}
                    changeCubeListOpacity={changeCubeListOpacity}
                  />
                )}
              <DeleteBtn
                categoryId={categoryId}
                categoryTitle={categoryTitle}
              />
            </span>
            <ChevronDownIcon size={16} className="pointer-disabled" />
          </div>
        </div>
      ) : (
        <div className="cat-item category-btn-cover theme-transition">
          <span className="category-title">{`${categoryTitle}`}</span>
          <div className="category-options-grp container-row pointer-disabled">
            <CubeCount
              categoryCubeLength={cubeListLength}
              cubeListOpened={false}
            />
            <ChevronRightIcon size={16} className="pointer-disabled" />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryCtrls;
