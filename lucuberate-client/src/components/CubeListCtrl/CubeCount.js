import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

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
      <i className={cubeListOpened ? "fa-cubes-opened" : "fa-cubes-closed"}>
        <FontAwesomeIcon icon={faCubes} />
      </i>
    </>
  );
};

export default CubeCount;
