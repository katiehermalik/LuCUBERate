import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

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
