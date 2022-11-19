import { PackageIcon } from "@primer/octicons-react";

const CubeCount = ({ categoryCubeLength, cubeListOpened }) => {
  return (
    <>
      <span
        className="fa-cubes-number"
        title={`${categoryCubeLength} ${
          categoryCubeLength > 1 ? "cubes" : "cube"
        }`}
        aria-label={`${categoryCubeLength} ${
          categoryCubeLength > 1 ? "cubes" : "cube"
        }`}>
        {categoryCubeLength}
      </span>
      <PackageIcon size={16} className="cube-icon" />
    </>
  );
};

export default CubeCount;
