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
    event.preventDefault();
    UserModel.logout({user: this.state})
      .then((data) => {
        this.props.history.push('/');
        console.log("data", data)
      });
  }

  render() {
    return(
      <>     
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-default btn-rounded mb-4" onClick={this.handleClick}>Logout</button>
        </form>
      </>
    )
  }

}

export default withRouter(Logout);