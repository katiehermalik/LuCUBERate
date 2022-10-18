import NewCubeBtn from './NewCubeBtn';
import ToggleQuestionsBtn from './ToggleQuestionsBtn';

function CubeHeader() {
  return <div className="cube-header container-row">
      <NewCubeBtn />
      <ToggleQuestionsBtn />
    </div>
}

export default CubeHeader;