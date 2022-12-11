import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@primer/octicons-react";
import { CurrentPathContext } from "../../context/ContextProvider";

const EditBtn = ({ cubeId }) => {
  const navigate = useNavigate();
  const { currentPath } = useContext(CurrentPathContext);

  const handleClick = e => {
    e.stopPropagation();
    navigate(`/dashboard/${cubeId}/edit`);
  };

  return (
    <button
      className={`btn edit-btn select-action-btn cube-action-btn ${
        currentPath[0] === "edit" ? "active" : "theme-transition"
      }`}
      type="button"
      onClick={handleClick}
      title="Edit Cube"
      aria-label="Edit Cube">
      <PencilIcon size={16} />
    </button>
  );
};

export default EditBtn;
