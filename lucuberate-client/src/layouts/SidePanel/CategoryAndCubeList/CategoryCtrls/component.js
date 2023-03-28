import { useContext } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@primer/octicons-react";
import {
  CurrentPathContext,
  CategoryContext,
  CubeContext,
} from "../../../../context/ContextProvider";
import QuestionsToggle from "./QuestionsToggle";
import CategoryShuffle from "./ShuffleCubes";
import CubeCount from "./CubeCount";
import DeleteBtn from "../DeleteBtn";
import "./style.css";

const CategoryCtrls = ({
  setCategoryWasShuffled,
  currCubeCat,
  currCatRef,
  cubeRefsLength,
  cubeListLength,
  categoryTitle,
  categoryId,
}) => {
  const { currentPath } = useContext(CurrentPathContext);
  const { currentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);

  const changeCubeListOpacity = () => {
    currCatRef.nextElementSibling.style.opacity = "0";
    setTimeout(() => {
      currCatRef.nextElementSibling.style.opacity = "1";
    }, 1000);
  };

  return (
    <>
      {currentCategory === categoryId ? (
        <div className="category-item category-btn-cover">
          <span className="category-title">{`${categoryTitle}`}</span>
          <div className="container-row pointer-disabled">
            <CubeCount categoryCubeLength={cubeListLength} />
            <span className="container-row pointer-auto">
              <QuestionsToggle />
              {currentCubeId &&
                currentPath[0] === "cube" &&
                currCubeCat === currentCategory &&
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
        <div className="category-item category-btn-cover">
          <span className="category-title">{`${categoryTitle}`}</span>
          <div className="container-row pointer-disabled">
            <CubeCount categoryCubeLength={cubeListLength} />
            <ChevronRightIcon size={16} className="pointer-disabled" />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryCtrls;
