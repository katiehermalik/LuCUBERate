import React from 'react';
import { withRouter  } from 'react-router-dom';


class CubeSelect extends React.Component {
  
  handleClick = () => {
    this.props.history.push(`/dashboard/${this.props.cube._id}`)
  }
  
  render() {
    return(
      <li className="radio-button">
          <label
            for={`Cube ${this.props.number}`}>
          <input
            key={this.props.key}
            type="radio"
            name='cube-select'
            id={`Cube ${this.props.number}`}
            value={`Cube ${this.props.number}`}
            onChange={this.handleClick}
          />
              {`Cube ${this.props.number}`}
          </label>
        </li>
    )
  }
}


export default withRouter(CubeSelect);