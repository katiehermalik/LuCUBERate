import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state ={}
  }
  
  render() {
    return (
      <>
        <nav className="nav-bar container-row">
        {this.props.user &&
        <>
          {window.location.pathname !== '/' &&
          <>
            <Link 
            className="navbar-brand navbar-item" 
            to="/">LuCUBERate
            </Link>
            <span 
              className="navbar-text">
              Hello, {this.props.user.currentUser.username}
            </span>
          </>
          }
          {window.location.pathname === '/' &&
          <Link 
          className="nav-item navbar-item nav-link"
          to="/dashboard">Dashboard
          </Link>
          }
        </>
        }
        {!this.props.user &&
        <>
          <div></div>
          <div className="signup-login container-row">
            <SignUp auth={this.props.auth} user={this.props.user}/>
            <Login auth={this.props.auth} user={this.props.user}/>
          </div>
        </>
        }
        {this.props.user &&
        <Logout logout={this.props.auth}/>
        }
        </nav>
      </>
    )
  }
}

export default withRouter(Navbar);