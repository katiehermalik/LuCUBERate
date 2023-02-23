import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageIcon } from "@primer/octicons-react";
import {
  CurrentPathContext,
  UserContext,
  DeleteContext,
  CategoryContext,
  CubeContext,
} from "../../context/ContextProvider";
import CubeAPI from "../../utils/api/cube";
import CategoryAPI from "../../utils/api/category";
import "./style.css";

const ConfirmationModal = ({ deleteModalInfo, setDeleteModalInfo }) => {
  const navigate = useNavigate();
  const { setCurrentPath } = useContext(CurrentPathContext);
  const { currentUserInfo, userInfoIsUpdating, setUserInfoIsUpdating } =
    useContext(UserContext);
  const { deleteLoader, setDeleteLoader } = useContext(DeleteContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const [currentCategoryInfo, setCurrentCategoryInfo] = useState({});
  const {
    cubeId,
    type,
    categoryId,
    categoryTitle,
    cubeListLength,
    categoryIsNew,
    newCategory,
    setIsLoadingButton,
    collectCubeFormData,
    createNewCategory,
  } = deleteModalInfo;

  useEffect(() => {
    setCurrentCategoryInfo(
      currentUserInfo.categories.find(
        category => category._id === currentCategory
      )
    );
  }, [currentCategory, currentUserInfo]);

  useEffect(() => {
    if (
      (type === "cube" && !currentCubeId && !userInfoIsUpdating) ||
      (type === "category" && !currentCategory && !userInfoIsUpdating)
    ) {
      navigate("/dashboard/instructions");
      setDeleteModalInfo({ showModal: false });
    }
  }, [
    currentCubeId,
    currentCategory,
    navigate,
    setDeleteModalInfo,
    type,
    userInfoIsUpdating,
  ]);

  const closeModal = e => {
    e.stopPropagation();
    e.preventDefault();
    type === "warning" && setIsLoadingButton(false);
    setDeleteModalInfo({ showModal: false });
  };

  const handleDeleteCategory = async e => {
    e.stopPropagation();
    setCurrentPath({
      type: "instructions",
      cubeId: null,
    });
    setCurrentCubeId("");
    setCurrentCategory(null);
    await CategoryAPI.delete(categoryId);
    setUserInfoIsUpdating(true);
    setDeleteLoader(true);
  };

  const handleDeleteCube = async e => {
    e.stopPropagation();
    setCurrentPath({
      type: "instructions",
      cubeId: null,
    });
    setCurrentCubeId("");
    const deletedCube = await CubeAPI.delete(cubeId);
    if (deletedCube.categoryDeleted) {
      setCurrentCategory(null);
    }
    setUserInfoIsUpdating(true);
    setDeleteLoader(true);
  };

  const handleMoveLastCube = async e => {
    e.stopPropagation();
    categoryIsNew ? createNewCategory() : collectCubeFormData(currentCategory);
    setDeleteModalInfo({ showModal: false });
  };

  return (
    <div
      onClick={closeModal}
      onMouseDown={closeModal}
      className="confirmation-modal modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <section
            className="modal-header"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}>
            <h4 className="modal-title" id="exampleModalLabel">
              {type === "category" && `Delete '${categoryTitle}' category`}
              {(type === "cube" &&
                cubeListLength === 1 &&
                "Delete last cube in category?") ||
                (type === "cube" && "Delete cube")}
              {type === "warning" && "Move last cube from category?"}
            </h4>
            <button
              type="button"
              onClick={closeModal}
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </section>
          <section
            className="modal-body"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}>
            {type === "category" && (
              <>
                <p>
                  All the cubes within this category will be deleted as well.
                </p>
                <p>Are you sure you want to delete this category?</p>
              </>
            )}
            {(type === "cube" && cubeListLength === 1 && (
              <>
                <p>
                  {`This is the last cube in the '${categoryTitle}' category!`}
                </p>
                <p>
                  {`If you choose to delete the last cube, the '${categoryTitle}' category will be deleted as well.`}
                </p>
                <p>{`Are you sure you want to delete this cube?`}</p>
              </>
            )) ||
              (type === "cube" && "Are you sure you want to delete this cube?")}
            {type === "warning" && (
              <>
                <p>
                  {`This is the last cube in the '${categoryTitle}' category!`}
                </p>
                <p>
                  {`If you choose to move this cube to the ${
                    categoryIsNew
                      ? `new '${newCategory}' category`
                      : `'${currentCategoryInfo.title}' category`
                  }, the '${categoryTitle}' category will be deleted upon saving.`}
                </p>
              </>
            )}
          </section>
          <section
            className="modal-footer"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}>
            <button
              value="Cancel"
              onClick={closeModal}
              disabled={deleteLoader ? true : false}
              className="btn form-btn btn-secondary">
              Cancel
            </button>
            <button
              onClick={
                (type === "category" && handleDeleteCategory) ||
                (type === "cube" && handleDeleteCube) ||
                (type === "warning" && handleMoveLastCube)
              }
              disabled={deleteLoader ? true : false}
              value={
                (type === "cube" &&
                  cubeListLength === 1 &&
                  "Delete Cube & Category") ||
                (type === "category" || type === "cube"
                  ? "Delete"
                  : "Save Cube & Delete Category")
              }
              className={`btn form-btn ${
                type === "category" || type === "cube"
                  ? "btn-danger"
                  : "btn-primary"
              } ${deleteLoader ? "loading" : ""}`}>
              {deleteLoader ? (
                <PackageIcon size={24} className="loading-icon" />
              ) : (
                (type === "cube" &&
                  cubeListLength === 1 &&
                  "Delete Cube & Category") ||
                (type === "category" || type === "cube"
                  ? "Delete"
                  : "Save Cube & Delete Category")
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
