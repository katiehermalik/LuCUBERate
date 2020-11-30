import React from 'react';
import UserModel from '../models/user';
import CubeButton from '../components/CubeButton'

class CubeList extends React.Component {
  state = {
    cubes: []
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user.user_Id
    UserModel.allCubes(user_id)
    .then((cubes) => {
      this.setState( cubes )
    });
  }

  renderCubes() {
    return this.state.cubes.map((cube) => {
      return (
        <CubeButton cube={cube} key={cube._id} />
      )
    });
  }

  render() {
    return(
      <div>
            {this.state.cubes &&
          <ul>
            {this.renderCubes()}
          </ul>
            }
      </div>
    )
  }
}

export default CubeList;