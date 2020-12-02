import React from 'react';
import CubeList from './CubeList';
import CubeHeader from './CubeHeader'


function CubeListCtrl() {

  return(
    <div id="cube-list-ctrl" className="container-column">
      <CubeHeader />
      <CubeList />
    </div>
  )
}

export default CubeListCtrl;