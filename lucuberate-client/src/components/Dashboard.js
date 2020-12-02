import React from 'react';
import CubeListCtrl from './CubeListCtrl/CubeListCtrl';
import AllAuthenticatedRoutes from '../config/AuthRoutes';

function Dashboard(props) {
  return(
    <div id="Dashboard" className="container-row">
    <CubeListCtrl />
    <AllAuthenticatedRoutes user={props.user} />
    </div>
  )
}

export default Dashboard;