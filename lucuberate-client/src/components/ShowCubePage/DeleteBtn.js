import { useState }from 'react';
import { withRouter } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteBtn = ({ cubeId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation()
    setShowModal(true);
  }

  return <> 
    <button 
    className="button cube-action-btn btn-ctrl"
    type="button"
    onClick={handleOpenModal}>
      <i className="prefix grey-text"><FontAwesomeIcon icon={faTrash} /></i>
    </button>
    <DeleteModal 
      showModal={showModal} 
      setShowModal={setShowModal}
      cubeId={cubeId}
      type='cube' />
  </>
}

export default withRouter(DeleteBtn);