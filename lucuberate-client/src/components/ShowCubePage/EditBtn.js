import { Link } from 'react-router-dom';

function EditBtn(props) {
  return(
  <Link 
    to={`/dashboard/${props.cube_id}/edit`}>
    <input
    className="button edit-btn btn-ctrl"
    type="button" 
    value="Edit Cube" />
  </Link>
  )
}

export default EditBtn;