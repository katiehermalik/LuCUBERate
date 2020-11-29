import React from 'react';
import SignUp from './Auth/SignUp';

class Navbar extends React.Component {
  state = {

  }
  render() {
    return (
      <>
        <SignUp />
        <div class="text-center">
          <a href="!#" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalRegisterForm">
          Sign Up</a>
        </div>
      </>
    )
  }
}

export default Navbar;