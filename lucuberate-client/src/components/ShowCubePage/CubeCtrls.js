import React from 'react';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn'


class CubeCtrls extends React.Component {
  render() {
    return(
      <div className="cube-ctrls container-column">
      <EditBtn cube_id={this.props.cube_id} />
      <DeleteBtn cube_id={this.props.cube_id} />
      </div>
    )
  }
}

export default CubeCtrls;