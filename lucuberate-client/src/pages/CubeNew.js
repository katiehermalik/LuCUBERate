import React from 'react';
import { Link } from 'react-router-dom';
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
    CubeModel.create(this.state)
      .then((data) => {
        this.props.history.push(`/dashboard/${data.cube._id}`);
      });
  }

  render() {
    return(
      <>
        {this.state &&
        <div className="form-container container-column">
          <h1 className="form-title">Create a New Study Cube</h1>
          <form onSubmit={this.handleSubmit} id="cube-new-form" className="cube-form">
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
                <label htmlFor="inputAlias">Visual Aid</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputVisualAid" 
                placeholder="Give the URL of a helpful image."
                name="visual_aid" 
                value={this.state.visual_aid}
                onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-buttons">
              <Link to='/dashboard'>
                <button 
                  type="submit" 
                  className="btn form-btn btn-secondary"
                  >
                  Cancel
                </button>
              </Link>
              <span> </span>
              <button 
                type="submit" 
                className="btn form-btn btn-warning">
                Generate New Cube</button>
            </div>
          </form>
        </div>
        }
      </>
    )
  }
}

export default CubeNew;