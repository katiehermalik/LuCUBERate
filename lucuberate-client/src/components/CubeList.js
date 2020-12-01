import React from 'react';
import UserModel from '../models/user';
import CubeButton from '../components/CubeButton'

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
        <CubeButton cube={cube} key={cube._id} number={index + 1}/>
      )
    });
  }

  render() {
    return(
      <span className="cubeListContainer">
          <ul className="cubeList">
            {this.renderCubes()}
          </ul>
      </span>
    )
  }
}

export default CubeList;