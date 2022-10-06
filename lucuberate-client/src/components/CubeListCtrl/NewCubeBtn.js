import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CubeContext, CategoryContext } from '../../context/ContextProvider';

const NewCubeBtn = () => {
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  
  const handleClick = () => {
    setCurrentCubeId('');
    // setCurrentCategory(null);
  }

  return <Link to='/dashboard/new'>
      <input
      onClick={handleClick} 
      className="button new-cube-btn btn-ctrl"
      type="button"
      value="New Cube" />
    </Link>
}

export default NewCubeBtn;