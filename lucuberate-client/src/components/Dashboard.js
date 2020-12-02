import React from 'react';
import CubeListCtrl from './CubeListCtrl/CubeListCtrl';
import PageContent from './PageContent';

function Dashboard(props) {
  return(
    <div id="Dashboard" className="container-row">
    <CubeListCtrl />
    <PageContent user={props.user} />
    </div>
  )
}

export default Dashboard;