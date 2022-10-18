import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext, CubeContext, CategoryContext } from '../context/ContextProvider';
import CubeModel from '../models/cube';
import CategoryModel from '../models/category';
import UserModel from '../models/user';

const DeleteModal = ({ 
  cubeId,
  showModal, 
  setShowModal, 
  type, 
  categoryId,
  categoryTitle,
  history 
}) => {

  const { userContent, setUserContent } = useContext(UserContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setCurrentCategory } = useContext(CategoryContext);

  const closeModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  }

  const handleDeleteCategory = (e) => {
    e.stopPropagation()
    CategoryModel.delete(categoryId)
    .then((data) => {
      UserModel.allCubesAndCategories(userContent.user_id)
      .then((categoriesAndCubes) => {
        setCurrentCubeId('');
        setCurrentCategory(null);
        setUserContent({...categoriesAndCubes, user_id: userContent.user_id });
      }); 
      history.push('/dashboard');
    });
  }
  const handleDeleteCube = async (e) => {
    e.stopPropagation();
    await history.push('/dashboard');
    setCurrentCubeId('');
    await CubeModel.delete(cubeId);
    const categoriesAndCubes = await UserModel.allCubesAndCategories(userContent.user_id);
    setUserContent({...categoriesAndCubes, user_id: userContent.user_id });
  }

  return <>
    {showModal &&
    <div className="delete-modal" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="delete-modal-dialog" role="document">
        <div className="delete-modal-content">
          <div className="delete-modal-header">
            <h5 className="delete-modal-title" id="exampleModalLabel">{type === 'category' ? `Delete '${categoryTitle}' Category` : 'Delete Cube'}</h5>
            <button type="button" onClick={closeModal} className="close" data-dismiss="delete-modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="delete-modal-body">
          {type === 'category' ? 'Are you sure you want to delete this category? All the cubes within this category will be deleted as well.' : 'Are you sure you want to delete this cube?'}
          </div>
          <div className="delete-modal-footer delete">
            <input type="button" value="Cancel" onClick={closeModal} className="btn btn-secondary" />
              <input 
                onClick={type === 'category' ? handleDeleteCategory : handleDeleteCube }
                type="button" 
                value="Delete" 
                className="btn btn-danger"
              />  
          </div>
        </div>
      </div>
    </div>
    }
  </>
}

export default withRouter(DeleteModal);