import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CubeContext from '../../context/CubeContextProvider';

  function CubeList (props) {
    const { cubeList } = useContext(CubeContext);
    let createdRefs = [];
    
    useEffect(() => {
      if (props.history.location.pathname.match(/\b[\w=.]+$/g)[0] === 'new') {
        createdRefs.forEach(ref => ref.checked = false);
      } else {
        const currentCubeId = props.history.location.pathname.match(/\b[\w=.]+$/g)
        const foundElement = createdRefs.find(element => element.defaultValue === currentCubeId[0]);
        if (foundElement) foundElement.checked = true;
      }
    }, [createdRefs, props.history.location.pathname])
    
    const handleClick = (e) => {
      props.history.push(`/dashboard/${e.target.value}`)
    }

    const renderNewCubePlaceHolder = () => {
      if (props.history.location.pathname.match(/\b[\w=.]+$/g)[0] === 'new' && cubeList.cubes) {
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
            ref={element => {createdRefs.push(element)}}
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
  )
}

export default withRouter(CubeList);

