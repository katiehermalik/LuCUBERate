import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Logout = ({ history, auth }) => {

  const handleSubmit = (event) => {
    history.push('/');
    localStorage.clear();
    auth({});
  }

  return <> 
    <form onSubmit={handleSubmit}>
      <button 
      className="button category-action-btn btn-ctrl navbar-item"
      type="submit">
        <i className="prefix grey-text"><FontAwesomeIcon icon={faSignOutAlt} /></i>
      </button>
    </form>
  </>
}

export default withRouter(Logout);