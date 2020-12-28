import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  state = {}

  handleSubmit = (event) => {
    this.props.history.push('/');
    localStorage.clear();
    this.props.auth({});
  }

  render() {
    return(
      <> 
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="logout-btn navbar-item nav-link">Logout</button>
        </form>
      </>
    )
  }
}

export default withRouter(Logout);