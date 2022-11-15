import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { ArrowSwitchIcon } from "@primer/octicons-react";
import { UserContext, CategoryContext } from "../../context/ContextProvider";
import CategoryModel from "../../models/category";

const CategoryShuffle = ({ changeCubeListOpacity, setCategoryWasShuffled }) => {
  const { currentCategory } = useContext(CategoryContext);
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);

  const handleShuffleCubes = async e => {
    e.stopPropagation();
    changeCubeListOpacity();
    const data = await CategoryModel.shuffle(currentCategory);
    setTimeout(() => {
      const indexOfCategory = currentUserInfo.categories.findIndex(
        category => category._id === data._id
      );
      currentUserInfo.categories[indexOfCategory] = data;
      setCurrentUserInfo(currentUserInfo);
      setCategoryWasShuffled(true);
    }, 400);
  };

  return (
    <>
      <button
        className="btn select-action-btn category-action-btn theme-transition"
        type="button"
        onClick={handleShuffleCubes}
        title="Shuffle Cubes"
        aria-label="Shuffle Cubes">
        <ArrowSwitchIcon size={16} />
      </button>
    </>
  );
};

export default withRouter(CategoryShuffle);
