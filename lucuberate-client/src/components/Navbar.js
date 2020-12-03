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
        <nav className="nav-bar navbar-light bg-light container-row">
        {this.props.user &&
          <a className="navbar-brand" href="/">LuCUBERate</a>
        }
          <div className="navlinks-container container-row">
            {!this.props.user &&
            <>
              <SignUp auth={this.props.auth} user={this.props.user}/>
              <Login auth={this.props.auth} user={this.props.user}/>
            </>
            }
            {this.props.user &&
            <>
              <span 
                className="navbar-text">
                Hello, {this.props.user.username}
                &nbsp;&nbsp;</span>
              <Logout logout={this.props.auth}/>
            </>
            }
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar;