import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CubeContext } from '../../context/ContextProvider';

const NewCubeBtn = () => {
  const { setCurrentCubeId } = useContext(CubeContext);
  
  const handleClick = () => {
    setCurrentCubeId('');
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