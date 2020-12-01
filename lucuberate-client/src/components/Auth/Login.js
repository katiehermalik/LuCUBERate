import React from 'react';
import { withRouter } from 'react-router-dom';
import UserModel from '../../models/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('handle change', event);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    UserModel.login(this.state)
      .then((data) => {
        this.setState(data)
        // Passing currentUser info to parent component (App.js)
        this.props.login(data);
        localStorage.setItem('user', JSON.stringify(data));
        if (this.state.currentUser) {
        this.props.history.push('/dashboard');
        window.location.reload();
        }
        console.log("This is the response from the user Model", data)
      });
  }

  render() {
    return(
      <> 
        <div class="text-center">
          <a href="!#" class="nav-item nav-link" data-toggle="modal" data-target="#modalLoginForm">
          Login</a>
        </div>    
        <div 
        className="modal fade" 
        id="modalLoginForm" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="myModalLabel"
        aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Login</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    <i className="prefix grey-text"><FontAwesomeIcon icon={faEnvelope} /></i>
                    <span> </span>
                    <label data-error="wrong" data-success="right" htmlFor="signup-email">Email</label>
                    <input 
                    type="email"
                    name="email"
                    id="signup-email" 
                    className="form-control validate"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    />
                  </div>
                  <div className="md-form mb-4">
                    <i className="prefix grey-text"><FontAwesomeIcon icon={faLock} /></i>
                    <span> </span>
                    <label data-error="wrong" data-success="right" htmlFor="signup-pass">Password</label>
                    <input 
                    type="password"
                    name="password" 
                    id="signup-pass" 
                    className="form-control validate" 
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" className="btn">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Login);