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
      className={
        pathname.match(/\b[\w=.]+$/g)[0] === "edit"
          ? "btn edit-btn active select-action-btn cube-action-btn"
          : "btn edit-btn select-action-btn cube-action-btn theme-transition"
      }
      type="button"
      onClick={handleClick}
      title="Edit Cube"
      aria-label="Edit Cube">
      <PencilIcon size={16} />
    </button>
  );
};

export default withRouter(EditBtn);
