import React from 'react';
import CubeModel from '../models/cube';
import DeleteCube from '../components/DeleteCube';
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
        <h3>Cube Show Page</h3>
        { this.state.cube &&
        <>
        <p>{this.state.cube.question}</p>
        <p>{this.state.cube.answer}</p>
        </>
        }
        <Link 
          to={`/games/${this.state.cube._id}/edit`}>
          <input
          type="button" 
          value="Edit Cube" />
        </Link>
        <span> </span>
        <DeleteCube cube_id={this.props.match.params.id}/>
      </>
    )
  }
}

export default CubeShow;