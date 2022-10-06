import React, { useState } from 'react';
import CubeModel from '../models/cube';
import StudyCube from '../components/ShowCubePage/StudyCube'
import { useEffect } from 'react';


function CubeShow(props) {
  const [ cube, setCube ] = useState({});

  useEffect(() => {
    const cubeId = props.match.params.id;
    CubeModel.getOne(cubeId)
      .then((data) => {
        setCube(data.cube)
      });
  },[props.match.params.id])

  return(
    <div className="show-page-container container-column">
      <StudyCube cube={cube} cubeId={props.match.params.id}/>  
    </div>
  )
}

export default CubeShow;