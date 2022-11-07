import React, { useState } from "react";
import CubeModel from "../models/cube";
import StudyCube from "../components/ShowCubePage/StudyCube";
import { useEffect } from "react";

const CubeShow = ({
  match: {
    params: { id: cubeId },
  },
}) => {
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
