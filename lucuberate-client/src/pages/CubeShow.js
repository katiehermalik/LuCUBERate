import React from 'react';
import CubeModel from '../models/cube';
import StudyCube from '../components/ShowCubePage/StudyCube'


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
      <div className="show-page-container container-column">
        <StudyCube cube={this.state.cube} cube_id={this.props.match.params.id}/>  
      </div>
    )
  }
}

export default CubeShow;