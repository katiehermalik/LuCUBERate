import { useNavigate } from "react-router-dom";
import "./style.css";

const NewCubeBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/new");
  };

  return (
    <button
      onClick={handleClick}
      className="btn new-cube-btn"
      type="button"
      value="Create New Cube"
      aria-label="Create New Cube">
      Create New Cube
    </button>
  );
};

export default NewCubeBtn;
