import { useState } from "react";
import { withRouter } from "react-router-dom";
import { TrashIcon } from "@primer/octicons-react";
import DeleteModal from "../DeleteModal";

const DeleteBtn = ({ cubeId, categoryTitle, categoryId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = e => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <button
        className={
          cubeId
            ? "button delete cube-action-btn btn-ctrl theme-transition"
            : "button delete category-action-btn btn-ctrl theme-transition"
        }
        type="button"
        onClick={handleOpenModal}
        title={cubeId ? "Delete Cube" : "Delete Category"}
        aria-label={cubeId ? "Delete Cube" : "Delete Category"}>
        <TrashIcon size={16} />
      </button>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        cubeId={cubeId}
        categoryId={categoryId}
        categoryTitle={categoryTitle}
        type={cubeId ? "cube" : "category"}
      />
    </>
  );
};

export default withRouter(DeleteBtn);
