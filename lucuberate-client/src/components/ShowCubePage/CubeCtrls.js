import React from "react";
import EditBtn from "../CubeListCtrl/EditBtn";
import DeleteBtn from "../CubeListCtrl/DeleteBtn";

const CubeCtrls = ({ cubeId, cubeListLength, categoryTitle }) => {
  return (
    <div className="cube-ctrls container-row">
      <EditBtn cubeId={cubeId} />
      <DeleteBtn
        cubeId={cubeId}
        cubeListLength={cubeListLength}
        categoryTitle={categoryTitle}
      />
    </div>
  );
};

export default CubeCtrls;
