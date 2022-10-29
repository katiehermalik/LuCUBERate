import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { UserContext, CategoryContext } from "../../context/ContextProvider";
import CategoryModel from "../../models/category";

const CategoryShuffle = ({ changeCubeListOpacity, setCategoryWasShuffled }) => {
  const { currentCategory } = useContext(CategoryContext);
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);

  const handleShuffleCubes = e => {
    e.stopPropagation();
    changeCubeListOpacity();
    CategoryModel.shuffle(currentCategory).then(data => {
      console.log("DATA---->", data);
      setTimeout(() => {
        const indexOfCategory = currentUserInfo.categories.findIndex(
          category => category._id === data._id
        );
        currentUserInfo.categories[indexOfCategory] = data;
        setCurrentUserInfo(currentUserInfo);
        setCategoryWasShuffled(true);
        console.log("Im off to re-render");
      }, 400);
    });
  };

  return (
    <>
      <button
        className="button category-action-btn btn-ctrl theme-transition"
        type="button"
        onClick={handleShuffleCubes}
        title="Shuffle Cubes"
        aria-label="Shuffle Cubes">
        <i className="prefix grey-text">
          <FontAwesomeIcon icon={faRandom} />
        </i>
      </button>
    </>
  );
};

export default withRouter(CategoryShuffle);
