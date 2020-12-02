import { Link } from 'react-router-dom';

function NewCubeBtn() {
  return (
    <Link to='/dashboard/new'>
      <input
      type="button"
      value="New Cube" />
    </Link>
  )
}

export default NewCubeBtn;