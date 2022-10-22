import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import ThemeSwitch from './ThemeSwitch';


const Navbar = ({ user, auth }) => {
  
  return <nav className="nav-bar container-row theme-transition">
    {user &&
      <div className="container-row">
        {window.location.pathname !== '/' &&
        <>
          <Link 
          className="button navbar-item theme-transition" 
          to="/">About LuCUBERate
          </Link>
        </>
        }
        {window.location.pathname === '/' &&
        <Link 
        className="button navbar-item theme-transition"
        to="/dashboard">Back to dashboard
        <i className="icon-chevron"><FontAwesomeIcon icon={faChevronRight} /></i>
        </Link>
        }
        <ThemeSwitch />
      </div>
    }
    {!user &&
      <div className="signup-login container-row">
        <SignUp auth={auth} user={user}/>
        <Login auth={auth} user={user}/>
      </div>
    }
    {user &&
      <div className="container-row">
        <div 
            className="navbar-item theme-transition">
            {user.currentUser.username}
        </div>
        <Logout logout={auth}/>
      </div>
    }
    </nav>
}

export default withRouter(Navbar);