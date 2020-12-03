import React from 'react';
import { withRouter } from 'react-router-dom';
// import UserModel from '../../models/user';

class Logout extends React.Component {
  
  state = {}

  handleSubmit = (event) => {
    this.props.history.push('/');
    localStorage.clear();
    this.props.auth({});
    // TO DO - logout not working - not getting rid of cookie!!
    // console.log(this.state)
    // UserModel.logout({user: this.state})
    //   .then((data) => {
    //     console.log("data", data)
    // });
  }


  render() {
    return(
      <> 
        {window.location.pathname === '/' &&
        <a href="/dashboard" className="nav-item nav-link">
          Dashboard</a>
        }
        <form onSubmit={this.handleSubmit}>
          <button type="submit" id="logout-btn" className="nav-item nav-link">Logout</button>
        </form>
      </>
    )
  }

}

export default withRouter(Logout);