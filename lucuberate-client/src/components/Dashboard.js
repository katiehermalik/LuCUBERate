import React from 'react';
import CubeListCtrl from './CubeListCtrl/CubeListCtrl';
import PageContent from './PageContent';
import CubeCtrls from './CubeCtrls/CubeCtrls';

function Dashboard() {

  return(
    <div id="Dashboard" className="container-row">
    <CubeListCtrl />
    <PageContent />
    <CubeCtrls />
    </div>
  )
}

export default Dashboard;