import { useContext } from "react";
import { ArrowSwitchIcon } from "@primer/octicons-react";
import {
  UserContext,
  CategoryContext,
} from "../../../../../context/ContextProvider";
import CategoryAPI from "../../../../../utils/api/category";

const ShuffleCubes = ({ changeCubeListOpacity, setCategoryWasShuffled }) => {
  const { currentCategory } = useContext(CategoryContext);
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);

  const handleShuffleCubes = async e => {
    e.stopPropagation();
    changeCubeListOpacity();
    const data = await CategoryAPI.shuffle(currentCategory);
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
    <button
      className="btn select-action-btn category-action-btn theme-transition"
      type="button"
      onClick={handleShuffleCubes}
      title="Shuffle Cubes"
      aria-label="Shuffle Cubes">
      <ArrowSwitchIcon size={16} />
    </button>
  );
};

export default ShuffleCubes;
