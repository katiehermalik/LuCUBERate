import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../DeleteModal';

const CategoryDelete = ({ categoryTitle }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (e) => {
      e.stopPropagation()
      console.log('stopped propagation');
      setShowModal(true);
    }

  return <> 
    <button 
    className="button category-action-btn btn-ctrl"
    type="button"
    onClick={handleOpenModal}>
      <i className="prefix grey-text"><FontAwesomeIcon icon={faTrash} /></i>
    </button>
    <DeleteModal 
      showModal={showModal} 
      setShowModal={setShowModal} 
      categoryTitle={categoryTitle} 
      type='category' />
  </>
}

export default withRouter(CategoryDelete);