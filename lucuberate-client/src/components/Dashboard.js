import React from "react";
import CubeListCtrl from "./CubeListCtrl/CubeListCtrl";
import AuthRoutes from "../config/AuthRoutes";

function Dashboard({ user }) {
  return (
    <div className="dashboard container-row theme-transition">
      <CubeListCtrl />
      <AuthRoutes user={user} />
    </div>
  );
}

export default Dashboard;
