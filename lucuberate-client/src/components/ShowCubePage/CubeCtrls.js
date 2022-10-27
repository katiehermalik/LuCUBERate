import React from 'react';
import EditBtn from '../CubeListCtrl/EditBtn';
import DeleteBtn from '../CubeListCtrl/DeleteBtn';


const CubeCtrls = ({ cubeId }) => {
  return <div className="cube-ctrls container-row">
    <EditBtn cubeId={cubeId} />
    <DeleteBtn cubeId={cubeId} />
  </div>
}

export default CubeCtrls;