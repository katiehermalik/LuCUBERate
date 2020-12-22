import React, { Component } from 'react';
import UserModel from '../models/user';

const MyContext = React.createContext();

class ContextProvider extends Component {
  state = {
    cubes: []
  }

  componentDidMount() {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id
      UserModel.allCubes(user_id)
      .then((cubes) => {
        if (cubes.cubes.length === this.state.cubes.length) {
          UserModel.allCubes(user_id)
          .then((cubers) => {
            this.setState( cubers )}) 
        } else {
          this.setState( cubes )
        }
      }); 
    }
  }

  render() {
    return (
    <MyContext.Provider value={{
      state: this.state,
      updateCubeList: () => this.componentDidMount()
      }
    }> 
      {this.props.children}
    </MyContext.Provider>
    )
  }
}

export {
  ContextProvider,
  MyContext
};