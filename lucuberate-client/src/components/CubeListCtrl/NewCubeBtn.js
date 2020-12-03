import { Link } from 'react-router-dom';

function NewCubeBtn() {
  return (
    <Link to='/dashboard/new'>
      <input
      className="button new-cube-btn btn-ctrl"
      type="button"
      value="New Cube" />
    </Link>
  )
}

export default NewCubeBtn;