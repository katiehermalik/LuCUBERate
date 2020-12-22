import React from 'react';
import UserModel from '../../models/user';
import CubeSelect from './CubeSelect';
import { MyContext } from '../../context/ContextProvider';


class CubeList extends React.Component {
  state = {
    cubes: []
  }

  componentDidMount() {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id
      UserModel.allCubes(user_id)
      .then((cubes) => {
        this.setState( cubes )
      });
    }
  }

  render() {
    return(
      <div className="cube-list container-column cube-select-group">
      <MyContext.Consumer>
        {(value) => (
          value.state.cubes.map((cube, index) => (
          <CubeSelect cube={cube} key={cube._id} number={index + 1}/>
          ))
        )}
      </MyContext.Consumer>
      </div>
    )
  }
}

CubeList.contextType = MyContext;
export default CubeList;