import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CubeModel from "../../models/cube";
import StudyCube from "../../components/ShowCubePage/StudyCube";

const CubeShow = () => {
  const { id: cubeId } = useParams();
  const [cubeData, setCubeData] = useState({});

  useEffect(() => {
    CubeModel.getOne(cubeId).then(data => {
      setCubeData(data.cube);
    });
  }, [cubeId]);

  return (
    <div className="show-page-container container-column">
      <StudyCube cubeData={cubeData} />
    </div>
  );
};

export default CubeShow;
