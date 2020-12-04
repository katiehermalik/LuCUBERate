import React from 'react';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state ={

    }
  }
  render() {
    return (
      <>
        <nav className="nav-bar container-row">
          <div className="navlinks-container container-row">
        {this.props.user &&
        <>
          <a className="navbar-brand navbar-item" href="/">LuCUBERate</a>
          <span 
            className="navbar-text">
            Hello, {this.props.user.username}. &nbsp; Let's study...
            &nbsp;&nbsp;</span>
          {window.location.pathname === '/' &&
          <a href="/dashboard" className="nav-item navbar-item nav-link">
            Dashboard</a>
          }
        </>
        }
          </div>
            {!this.props.user &&
            <div className="container-row">
              <SignUp auth={this.props.auth} user={this.props.user}/>
              <Login auth={this.props.auth} user={this.props.user}/>
            </div>
            }
            {this.props.user &&
            <Logout logout={this.props.auth}/>
            }
        </nav>
      </>
    )
  }
}

export default Navbar;