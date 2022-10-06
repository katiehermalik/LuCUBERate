import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EditBtn = ({ history, cubeId }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    history.push(`/dashboard/${cubeId}/edit`);
  }

  return <> 
    <button 
    className="button cube-action-btn btn-ctrl"
    type="button"
    onClick={handleClick}>
      <i className="prefix grey-text"><FontAwesomeIcon icon={faEdit} /></i>
    </button>
  </>
}

export default withRouter(EditBtn);