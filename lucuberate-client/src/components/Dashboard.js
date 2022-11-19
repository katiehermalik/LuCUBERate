import React from "react";
import CubeListCtrl from "./CubeListCtrl/CubeListCtrl";
import AllAuthenticatedRoutes from "../config/AuthRoutes";

function Dashboard({ user }) {

  return (
    <div className="dashboard container-row theme-transition">
      <CubeListCtrl />
      <AllAuthenticatedRoutes user={user} />
    </div>
  );
}

export default Dashboard;
