import React from 'react';
import { Link } from 'react-router-dom';


function CubeSelect(props) {
  return(
    <Link to={`/dashboard/${props.cube._id}`} >
      <button className="button cube-select-btn">Cube {props.number}</button>
    </Link>
  )
}


export default CubeSelect;