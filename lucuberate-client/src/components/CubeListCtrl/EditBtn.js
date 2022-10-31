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
          ? "button active cube-action-btn btn-ctrl"
          : "button cube-action-btn btn-ctrl theme-transition"
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
