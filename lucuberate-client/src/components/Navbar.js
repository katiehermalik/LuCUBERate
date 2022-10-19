import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

const Navbar = ({ user, auth }) => {
  return <nav className="nav-bar container-row">
    {user &&
    <>
      {window.location.pathname !== '/' &&
      <>
        <Link 
        className="button navbar-item" 
        to="/">About LuCUBERate
        </Link>
        {/* <span 
          className="navbar-text">
          Hello, {user.currentUser.username}
        </span> */}
      </>
      }
      {window.location.pathname === '/' &&
      <Link 
      className="button navbar-item"
      to="/dashboard">Back to dashboard
      <i className="icon-chevron"><FontAwesomeIcon icon={faChevronRight} /></i>
      </Link>
      }
    </>
    }
    {!user &&
    <>
      <div></div>
      <div className="signup-login container-row">
        <SignUp auth={auth} user={user}/>
        <Login auth={auth} user={user}/>
      </div>
    </>
    }
    {user &&
    <Logout logout={auth}/>
    }
    </nav>
}

export default withRouter(Navbar);