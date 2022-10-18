import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CubeContext } from '../../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewCubeBtn = () => {
  const { setCurrentCubeId } = useContext(CubeContext);
  
  const handleClick = () => {
    setCurrentCubeId('');
  }

  return <Link to='/dashboard/new'>
      <button
      onClick={handleClick} 
      className="button header-btns btn-ctrl"
      type="button"
      value="Create New Cube"
      title="Create New Cube"
      aria-label="Create New Cube"
      >
      <i className="prefix grey-text"><FontAwesomeIcon icon={faPlus} /></i>
      <br/>Create New Cube</button>
    </Link>
}

export default NewCubeBtn;