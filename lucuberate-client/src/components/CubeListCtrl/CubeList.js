import React from 'react';
import UserModel from '../../models/user';
import CubeSelect from './CubeSelect'

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

  componentDidUpdate() {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id
      UserModel.allCubes(user_id)
      .then((cubes) => {
        this.setState( cubes )
      });
    }
  }

  renderCubes() {
    return this.state.cubes.map((cube, index) => {
      return (
        <CubeSelect cube={cube} key={cube._id} number={index + 1}/>
      )
    });
  }

  render() {
    return(
      <div className="cube-list container-column">
          <ul className="cubeList">
            {this.renderCubes()}
          </ul>
      </div>
    )
  }
}

export default CubeList;