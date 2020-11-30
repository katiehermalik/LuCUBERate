import React from 'react';

class CubeNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <>
        <div className="form-container">
          <form id="CubeNewForm" className="CubeForm">
            <div className="form-row">
              <div className="form-group col-md-5">
                <label for="inputQuestion">Question</label>
                <textarea type="text" className="form-control" id="inputQuestion" placeholder="What would you like to study?" />
              </div>
              <div className="form-group col-md-5">
                <label for="inputAnswer">Answer</label>
                <textarea type="text" className="form-control" id="inputAnswer" placeholder="You've got this!" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label for="inputHint">Hint</label>
                <textarea type="text" className="form-control" id="inputHint" placeholder="Give yourself a nudge in the right direction." />
              </div>
              <div className="form-group col-md-5">
                <label for="inputNotes">Notes</label>
                <textarea type="text" className="form-control" id="inputNotes" placeholder="Anything to help with memorization." />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="inputLink">Link</label>
                <input type="text" className="form-control" id="inputLink" placeholder="Add a URL to a resource." />
              </div>
              <div className="form-group col-md-3">
              <label for="inputAlias">Link Alias</label>
                <input type="text" className="form-control" id="inputAlias" placeholder="Give the URL a shorter name." />
              </div>
              <div className="form-group col-md-3">
                <label for="customFile">Visual Aid</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" />
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
              </div>
            </div>
            <div className="form-group">

            </div>
            <button type="submit" className="btn btn-primary">Generate New Cube</button>
          </form>
        </div>
      </>
    )
  }
}

export default CubeNew;