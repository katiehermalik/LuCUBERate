import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../DeleteModal';

const DeleteBtn = ({ cubeId, categoryTitle, categoryId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation()
    setShowModal(true);
  }

  return <> 
    <button 
    className={cubeId ? "button delete cube-action-btn btn-ctrl" : "button delete category-action-btn btn-ctrl"}
    type="button"
    onClick={handleOpenModal}
    title={cubeId ? "Delete Cube" : "Delete Category"}
    aria-label={cubeId ? "Delete Cube" : "Delete Category"} >
      <i className="prefix grey-text"><FontAwesomeIcon icon={faTrash} /></i>
    </button>
    <DeleteModal 
      showModal={showModal} 
      setShowModal={setShowModal}
      cubeId={cubeId}
      categoryId={categoryId} 
      categoryTitle={categoryTitle} 
      type={cubeId ? "cube" : "category"} />
  </>
}

export default withRouter(DeleteBtn);