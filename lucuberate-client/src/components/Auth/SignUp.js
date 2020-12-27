import React from 'react';
import { withRouter } from 'react-router-dom';
import UserModel from '../../models/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

class SignUp extends React.Component {
  
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    emailError: "",
    passwordError: "",
    usernameError: ""
  }

  validateUsername() {
    if (this.state.username?.length < 3) {
      this.setState({usernameError: 'Username must be 3 or more characters long'})
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
    if (this.state.password === this.state.password_confirmation) {
      UserModel.create(this.state)
        .then((data) => {
          if (data.emailError) {
            this.setState({emailError: data.emailError});
            this.validateUsername();
          } else {
            if (this.state.username?.length < 3) {
              this.validateUsername();
            } else {
              this.setState(data);
              // Passing currentUser info to parent component (App.js)
              this.props.auth(data);
              localStorage.setItem('user', JSON.stringify(data));
              if (this.state.currentUser) {
              this.props.history.push('/dashboard');
                window.location.reload();
              }
            }
          }
        }
      );
    } else {
      this.setState({passwordError: 'Passwords do not match'});
      this.validateUsername();
    }
  }


  render() {
    const errorStyle = {
      color: "red",
      fontSize: "12px",
    }
    return(
      <>
        <div className="text-center">
          <a href="!#" className="nav-item navbar-item nav-link" data-toggle="modal" data-target="#modalRegisterForm">
          Sign Up</a>
        </div>
        <div 
        className="modal fade" 
        id="modalRegisterForm" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="myModalLabel"
        aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Sign up</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    <i className="prefix grey-text"><FontAwesomeIcon icon={faUser} /></i>
                    <span> </span>
                    <label data-error="wrong" data-success="right" htmlFor="signup-username">Username</label>
                    <input 
                    type="text"
                    name="username" 
                    id="signup-username" 
                    className="form-control validate" 
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    />
                    {this.state.usernameError &&
                    <p style={errorStyle}>{this.state.usernameError}</p>
                    }
                  </div>
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
                    {this.state.emailError &&
                    <p style={errorStyle}>{this.state.emailError}</p>
                    }
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
                    autoComplete="off"
                    />
                  </div>
                  <div className="md-form mb-4">
                    <i className="prefix grey-text"><FontAwesomeIcon icon={faLock} /></i>
                    <span> </span>
                    <label data-error="wrong" data-success="right" htmlFor="signup-pass-confirm">Password Confirmation</label>
                    <input 
                    type="password" 
                    name="password_confirmation"
                    id="signup-pass-confirm" 
                    className="form-control validate" 
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    />
                    {this.state.passwordError &&
                    <p style={errorStyle}>{this.state.passwordError}</p>
                    }
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" className="btn">Sign up</button>
                  <hr size="2" width="70%" />
                  <p>Already have an account? <a href="!#" data-dismiss="modal" data-toggle="modal" data-target="#modalLoginForm" >Login</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(SignUp);