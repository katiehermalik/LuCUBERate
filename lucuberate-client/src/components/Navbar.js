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
        <nav className="nav-bar navbar-expand-lg navbar-light bg-light">
        {this.props.user &&
          <a className="navbar-brand" href="/dashboard">LuCUBERate</a>
        }
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navlinks-container">
              <div className="navbar-nav">
                {!this.props.user &&
                <>
                  <SignUp auth={this.props.auth} user={this.props.user}/>
                  <Login auth={this.props.auth} user={this.props.user}/>
                </>
                }
                {this.props.user &&
                <>
                  <span className="navbar-text">Hello, {this.props.user.username}</span>
                  <Logout logout={this.props.auth}/>
                </>
                }
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar;