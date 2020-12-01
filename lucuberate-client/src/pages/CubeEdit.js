import React from 'react';
import CubeModel from '../models/cube';

class CubeEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const cubeId = this.props.match.params.id;
    CubeModel.getOne(cubeId)
    .then((data) => {
      this.setState(data.cube);
      console.log('For edit form info:', data.cube)
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSave = (event) => {
    event.preventDefault();
    const cubeId = this.props.match.params.id;
    CubeModel.update(this.state, cubeId)
      .then((data) => {
        this.props.history.push(`/dasboard/${cubeId}`);
        console.log('this.props:', this.props)
      });
  };


  render() {
    return(
      <>
      {this.state &&
        <div className="form-container">
          <form onSubmit={this.handleFormSave} id="CubeNewForm" className="CubeForm">
            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="inputQuestion">Question</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputQuestion" 
                placeholder="What would you like to study?"
                name="question" 
                value={this.state.question}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputAnswer">Answer</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputAnswer" 
                placeholder="You've got this!"
                name="answer" 
                value={this.state.answer}
                onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="inputHint">Hint</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputHint" 
                placeholder="Give yourself a nudge in the right direction."
                name="hint" 
                value={this.state.hint}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputNotes">Notes</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputNotes" 
                placeholder="Anything to help with memorization."
                name="notes" 
                value={this.state.notes}
                onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputLink">Link</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputLink" 
                placeholder="Add a URL to a resource."
                name="link" 
                value={this.state.link}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-3">
              <label htmlFor="inputAlias">Link Alias</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputAlias" 
                placeholder="Give the URL a shorter name."
                name="link_alias" 
                value={this.state.link_alias}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="customFile">Visual Aid</label>
                <div className="custom-file">
                  <input 
                  type="file" 
                  className="custom-file-input" 
                  id="customFile"
                  name="visual_aid" 
                  value={this.state.visual_aid}
                  onChange={this.handleChange} />
                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
        }
      </>
    )
  }
}

export default CubeEdit;