import React from 'react';
import { withRouter  } from 'react-router-dom';


class CubeSelect extends React.Component {
  
  handleClick = () => {
    this.props.history.push(`/dashboard/${this.props.cube._id}`)
  }
  
  render() {
    return(
      <li 
        key={`list-item-${this.props.key}`}
        className="radio-button">
        <input
          key={`input-item-${this.props.key}`}
          type="radio"
          name="cube-select"
          value={`Cube ${this.props.number}`}
          id={`Cube ${this.props.number}`}
          onChange={this.handleClick}
          />
        <label
          key={`label-item-${this.props.key}`}
          className="radio-label"
          htmlFor={`Cube ${this.props.number}`}>
            {`Cube ${this.props.number}`}
        </label>
      </li>
    )
  }
}


export default withRouter(CubeSelect);