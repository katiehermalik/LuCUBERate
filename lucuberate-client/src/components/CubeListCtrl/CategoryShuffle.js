import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { UserContext, CategoryContext, CubeContext } from '../../context/ContextProvider';
import CategoryModel from '../../models/category';

const CategoryShuffle = ({ history }) => {
    const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
    const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
    const { userContent, setUserContent } = useContext(UserContext);

    const handleShuffleCubes = (e) => {
      e.stopPropagation();
      CategoryModel.shuffle(currentCategory)
      .then((data) => {
        console.log('DATA---->', data);
        const indexOfCategory = userContent.categories.findIndex(category => category._id === data._id);
        userContent.categories[indexOfCategory] = data;
        setUserContent(userContent);
        setCurrentCubeId(userContent.categories[indexOfCategory].cubes[0]);
        history.push(`/dashboard/${userContent.categories[indexOfCategory].cubes[0]}`);
      });
    }

  return <> 
    <button 
    className="button category-action-btn btn-ctrl"
    type="button"
    onClick={handleShuffleCubes}>
      <i className="prefix grey-text"><FontAwesomeIcon icon={faRandom} /></i>
    </button>
  </>
}

export default withRouter(CategoryShuffle);