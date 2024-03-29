import { useContext } from "react";
import { TrashIcon } from "@primer/octicons-react";
import { DeleteContext } from "../../../../context/ContextProvider";
import "./style.css";

const DeleteBtn = ({ cubeId, categoryTitle, categoryId, cubeListLength }) => {
  const { setDeleteModalInfo } = useContext(DeleteContext);

  const handleOpenModal = e => {
    e.stopPropagation();
    setDeleteModalInfo({
      showDeleteModal: true,
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
          ? "btn delete select-action-btn cube-action-btn"
          : "btn delete select-action-btn category-action-btn"
      }
      type="button"
      onClick={handleOpenModal}
      title={cubeId ? "Delete Cube" : "Delete Category"}
      aria-label={cubeId ? "Delete Cube" : "Delete Category"}>
      <TrashIcon size={16} />
    </button>
  );
};

export default DeleteBtn;
