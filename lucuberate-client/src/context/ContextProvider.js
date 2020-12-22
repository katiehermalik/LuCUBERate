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
        // Waiting to see when new cube has been added to the database by comparing the response object in the fetch calls with current state. Once new cube has been added and lengths differ, set state.
        if (cubes.cubes.length === this.state.cubes.length) {
          this.componentDidMount()
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