import { withRouter } from "react-router-dom";
import { PencilIcon } from "@primer/octicons-react";

const EditBtn = ({
  history,
  cubeId,
  history: {
    location: { pathname },
  },
}) => {
  const handleClick = e => {
    e.stopPropagation();
    history.push(`/dashboard/${cubeId}/edit`);
  };

  return (
    <button
      className={`btn edit-btn select-action-btn cube-action-btn ${
        pathname.match(/\b[\w=.]+$/g)[0] === "edit"
          ? "active"
          : "theme-transition"
      }`}
      type="button"
      onClick={handleClick}
      title="Edit Cube"
      aria-label="Edit Cube">
      <PencilIcon size={16} />
    </button>
  );
};

export default withRouter(EditBtn);
