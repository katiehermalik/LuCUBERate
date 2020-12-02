import React from 'react';
import CubeModel from '../models/cube';
import Cube from '../components/ShowCubePage/Cube'
import CubeCtrls from '../components/ShowCubePage/CubeCtrls'


class CubeShow extends React.Component {
  state = {
    cube: {}
  }

  componentDidMount() {
    const cube_id = this.props.match.params.id;
    CubeModel.getOne(cube_id)
      .then((data) => {
        this.setState({ cube: data.cube})
      });
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } } } = this.props
    if (prevProps.match.params.id !== id){
      this.componentDidMount();
    }
  }

  render() {
    return(
      <div id="show-page-container" className="container-row">
        <Cube />
        <CubeCtrls cube_id={this.props.match.params.id}/>
      </div>
    )
  }
}

export default CubeShow;