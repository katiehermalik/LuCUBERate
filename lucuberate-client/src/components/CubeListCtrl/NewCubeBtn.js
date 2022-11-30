import { useContext } from "react";
import { Link } from "react-router-dom";
import { CubeContext } from "../../context/ContextProvider";

const NewCubeBtn = () => {
  const { setCurrentCubeId } = useContext(CubeContext);

  const handleClick = () => {
    setCurrentCubeId("");
  };

  return (
    <Link tabIndex="-1" to="/dashboard/new">
      <button
        onClick={handleClick}
        className="btn header-btns"
        type="button"
        value="Create New Cube"
        aria-label="Create New Cube">
        Create New Cube
      </button>
    </Link>
  );
};

export default NewCubeBtn;
