import React from 'react';
import { withRouter } from 'react-router-dom';
import UserModel from '../../models/user'
import '../../pages/Landing/Landing.css';

class Logout extends React.Component {
  
  state = {
    email: "",
    password: "",
  }

  handleSubmit = (event) => {
    console.log('logout clicked')
    localStorage.clear();
    this.props.logout({});
    this.props.history.push('/');
    // TO DO - logout not working - not getting rid of cookie!!
    // UserModel.logout({user: this.state})
    //   .then((data) => {
        // console.log("data", data)
    // });
  }


  render() {
    return(
      <>     
        <form onSubmit={this.handleSubmit}>
          <button type="submit" id="logout-btn" className="nav-item nav-link">Logout</button>
        </form>
      </>
    )
  }

}

export default withRouter(Logout);