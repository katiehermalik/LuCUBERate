
import { withRouter, useParams } from 'react-router-dom';
// import { useRef } from "react";
// import { useEffect } from 'react';

const CubeSelect = (props) => {
  // const inputElement = useRef(null);
  // const { id } = useParams();

  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(props.number, time) 

  const handleClick = (event) => {
    props.history.push(`/dashboard/${props.cube._id}`)
    // console.log("clicked")
    // inputElement.current.checked = false;
    // console.log(inputElement)
  }

  return(
    <>
    {console.log('CubeSelect is rendering!')}
    <li 
      key={`list-item-${props.key}`}
      className="radio-button"
      >
      <input
        key={`input-item-${props.key}`}
        type="radio"
        name="cube-select"
        value={props.cube._id}
        id={`Cube ${props.number}`}
        onChange={handleClick}
        // ref={inputElement}
        />
      <label
        key={`label-item-${props.key}`}
        className="radio-label"
        htmlFor={`Cube ${props.number}`}>
          {`Cube ${props.number}`}
      </label>
    </li>
    </>
      
  )
}



export default withRouter(CubeSelect);