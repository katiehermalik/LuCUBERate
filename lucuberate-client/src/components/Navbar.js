import React from 'react';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

class Navbar extends React.Component {

  render() {
    return (
      <>
        <SignUp />
        <Login />
        <Logout />
      </>
    )
  }
}

export default Navbar;