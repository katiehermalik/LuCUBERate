import React from 'react';
import CubeModel from '../models/cube';
import { Link } from 'react-router-dom';

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

  componentDidUpdate() {
    const cube_id = this.props.match.params.id;
    CubeModel.getOne(cube_id)
      .then((data) => {
        this.setState({ cube: data.cube})
      });
  }
  
  handleDeleteClick() {

  }

  renderCube() {

  }

  render() {
    return(
      <>
      { this.state.cube &&
      <>
      <h3>Cube Show Page</h3>
      <p>{this.state.cube.question}</p>
      <p>{this.state.cube.answer}</p>
      </>
      }
      </>
    )
  }
}

export default CubeShow;