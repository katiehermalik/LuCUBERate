import React from 'react';
import { Link } from 'react-router-dom';

function CubeButton(props) {
  return(
    <Link to={`/dashboard/${props.cube._id}`}>
      <div className="CubeShowButton">
        <h6>{props.cube.question}</h6>
      </div>
    </Link>
  )
}


export default CubeButton;