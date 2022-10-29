import React from "react";
import CubeList from "./CubeList";
import CubeHeader from "./CubeHeader";

function CubeListCtrl() {
  return (
    <div className="cube-list-ctrl container-column theme-transition">
      <CubeHeader />
      <CubeList />
    </div>
  );
}

export default CubeListCtrl;
