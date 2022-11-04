import NewCubeBtn from "./NewCubeBtn";
import ToggleQuestionsBtn from "./ToggleQuestionsBtn";

function CubeHeader() {
  return (
    <div className="cube-header container-row theme-transition mobile-hidden">
      <NewCubeBtn />
      <ToggleQuestionsBtn />
    </div>
  );
}

export default CubeHeader;
