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

  return <form onSubmit={handleSubmit}>
      <button 
      className="button btn-ctrl navbar-item theme-transition"
      type="submit"
      title="log out">Log Out&ensp;<i className="prefix grey-text"><FontAwesomeIcon icon={faSignOutAlt} /> </i>
      </button>
    </form>
}

export default withRouter(Logout);