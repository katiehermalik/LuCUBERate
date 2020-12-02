import React from 'react';
import { Link } from 'react-router-dom';


function CubeSelect(props) {
  return(
    <Link to={`/dashboard/${props.cube._id}`} >
      <span className="CubeShowButton">
        <p className="cubeName">Cube {props.number}</p>
      </span>
    </Link>
  )
}


export default CubeSelect;