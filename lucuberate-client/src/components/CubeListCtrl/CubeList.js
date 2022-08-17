import React, { useContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import CubeContext from '../../context/CubeContextProvider';

const CubeList = ({ history, history:{location:{pathname}}}) => {
  const { cubeList } = useContext(CubeContext);
  const cubeInputRefs = useRef([]);

  useEffect(() => {
    if (cubeInputRefs.current.length !== 0) {
      if (pathname.match(/\b[\w=.]+$/g)[0] === 'new') {
        cubeInputRefs.current.forEach(ref => ref.checked = false);
        const newestCubeListElement = cubeInputRefs.current[cubeInputRefs.current.length - 1];
        newestCubeListElement.scrollIntoView({ behavior: 'smooth', block: 'center'});
      } else if (pathname.match(/\b[\w=.]+$/g)[0] === 'edit') {
        const editElement = cubeInputRefs.current.find(element => element.checked === true);
        editElement.scrollIntoView({behavior: 'smooth', block: 'center'});
      } else {
        const currentCubeId = pathname.match(/\b[\w=.]+$/g);
        const foundElement = cubeInputRefs.current.find(element => element.defaultValue === currentCubeId[0]);
        if (foundElement) {
          foundElement.checked = true;
          foundElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      }
    }
  }, [cubeList, cubeInputRefs, pathname])
  
  const handleClick = (e) => {
    history.push(`/dashboard/${e.target.value}`);
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center'});
  }

  const renderNewCubePlaceHolder = () => {
    if (pathname.match(/\b[\w=.]+$/g)[0] === 'new' && cubeList.cubes) {
      return(
        <li className="radio-button">
          <input
            type="radio"
            id={`Cube_${cubeList.cubes.length + 1}`}
            onChange={handleClick}
            checked={true}
            />
          <label
            className="radio-label"
            htmlFor={`Cube_${cubeList.cubes.length + 1}`}>
              {`Cube ${cubeList.cubes.length + 1}`}
          </label>
        </li>
      )
    }
  }

  return (
    <>
      {cubeInputRefs.current = []}
      <div className="cube-list container-column cube-select-group">
        {cubeList.cubes?.map((cube, i) => (
        <li 
          key={`list-item-${cube._id}`}
          className="radio-button"
          >
          <input
            key={cube._id}
            type="radio"
            name="cube-select"
            value={cube._id}
            id={`Cube_${i + 1}`}
            onChange={handleClick}
            ref={element => { 
              if (element) cubeInputRefs.current = [...cubeInputRefs.current, element];
            }}
            />
          <label
            key={`label-item-${cube._id}`}
            className="radio-label"
            htmlFor={`Cube_${i + 1}`}>
              {`Cube ${i + 1}`}
          </label>
        </li>
        ))
      }  
      {renderNewCubePlaceHolder()}
    </div>
    </>
  )
}

export default withRouter(CubeList);

