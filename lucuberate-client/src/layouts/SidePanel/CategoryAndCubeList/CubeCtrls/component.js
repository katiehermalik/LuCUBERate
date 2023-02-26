import { memo } from "react";
import EditBtn from "./EditCubeBtn";
import DeleteBtn from "../DeleteBtn";
import "./style.css";

const CubeCtrls = memo(({ cubeId, cubeListLength, categoryTitle }) => {
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
});

export default CubeCtrls;
