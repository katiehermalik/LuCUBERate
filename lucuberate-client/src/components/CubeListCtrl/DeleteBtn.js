import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { TrashIcon } from "@primer/octicons-react";
import { DeleteModalContext } from "../../context/ContextProvider";

const DeleteBtn = ({ cubeId, categoryTitle, categoryId, cubeListLength }) => {
  const { setDeleteModalInfo } = useContext(DeleteModalContext);

  const handleOpenModal = e => {
    e.stopPropagation();
    setDeleteModalInfo({
      showModal: true,
      type: cubeId ? "cube" : "category",
      cubeId: cubeId || "",
      categoryId: categoryId || "",
      categoryTitle: categoryTitle || "",
      cubeListLength: cubeListLength || 0,
    });
  };

  return (
    <button
      className={
        cubeId
          ? "btn delete select-action-btn cube-action-btn theme-transition"
          : "btn delete select-action-btn category-action-btn theme-transition"
      }
      type="button"
      onClick={handleOpenModal}
      title={cubeId ? "Delete Cube" : "Delete Category"}
      aria-label={cubeId ? "Delete Cube" : "Delete Category"}>
      <TrashIcon size={16} />
    </button>
  );
};

export default withRouter(DeleteBtn);
