import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { UserContext, CategoryContext, CubeContext } from '../../context/ContextProvider';
import CategoryModel from '../../models/category';

const CategoryShuffle = ({ history, changeCubeListOpacity, currCategoryCubeRefs }) => {
    const { currentCategory } = useContext(CategoryContext);
    const { currentCubeId } = useContext(CubeContext);
    const { userContent, setUserContent } = useContext(UserContext);

    const handleShuffleCubes = (e) => {
      e.stopPropagation();
      changeCubeListOpacity();
      CategoryModel.shuffle(currentCategory)
      .then((data) => {
        console.log('DATA---->', data);
        setTimeout(() => {
          const indexOfCategory = userContent.categories.findIndex(category => category._id === data._id);
          userContent.categories[indexOfCategory] = data;
          setUserContent(userContent);
          const indexOfCube = userContent.categories[indexOfCategory].cubes.findIndex(cube => cube === currentCubeId)
          const cubeId = userContent.categories[indexOfCategory].cubes[indexOfCube]
          cubeId && history.push(`/dashboard/${cubeId}`);
          const foundCubeRef = currCategoryCubeRefs.find(cube => cube.ref.value === currentCubeId);
          if (foundCubeRef) {
            foundCubeRef.ref.checked = true; 
            foundCubeRef.ref.scrollIntoView({behavior: 'smooth', block: 'center'});
          }
        }, 500);
      });
    }

  return <>
    <button 
    className="button category-action-btn btn-ctrl"
    type="button"
    onClick={handleShuffleCubes}
    title= "Shuffle Cubes"
    aria-label="Shuffle Cubes">
      <i className="prefix grey-text"><FontAwesomeIcon icon={faRandom} /></i>
    </button>
  </>
}

export default withRouter(CategoryShuffle);