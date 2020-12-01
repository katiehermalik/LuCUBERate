import React from 'react';
import CubeModel from '../models/cube';

class CubeNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: '',
      hint: '',
      visual_aid: '',
      link: '',
      link_alias: '',
      notes: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('handle change', event);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('called form submit');
    // NOTE: this.state is only properties for new cube
    // TODO - change push location
    CubeModel.create(this.state)
      .then((data) => {
        console.log(data)
        this.props.history.push('/dashboard');
      });
  }

  render() {
    return(
      <>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} id="CubeNewForm" className="CubeForm">
            <div className="form-row">
              <div className="form-group col-md-5">
                <label for="inputQuestion">Question</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputQuestion" 
                placeholder="What would you like to study?"
                name="question" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-5">
                <label for="inputAnswer">Answer</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputAnswer" 
                placeholder="You've got this!"
                name="answer" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label for="inputHint">Hint</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputHint" 
                placeholder="Give yourself a nudge in the right direction."
                name="hint" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-5">
                <label for="inputNotes">Notes</label>
                <textarea 
                type="text" 
                className="form-control" 
                id="inputNotes" 
                placeholder="Anything to help with memorization."
                name="notes" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="inputLink">Link</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputLink" 
                placeholder="Add a URL to a resource."
                name="link" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-3">
              <label for="inputAlias">Link Alias</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputAlias" 
                placeholder="Give the URL a shorter name."
                name="link_alias" 
                value={this.state.username}
                onChange={this.handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label for="customFile">Visual Aid</label>
                <div class="custom-file">
                  <input 
                  type="file" 
                  class="custom-file-input" 
                  id="customFile"
                  name="visual_aid" 
                  value={this.state.username}
                  onChange={this.handleChange} />
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Generate New Cube</button>
          </form>
        </div>
      </>
    )
  }
}

export default CubeNew;