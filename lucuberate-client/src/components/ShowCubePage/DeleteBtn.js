import React from 'react';
import { withRouter } from 'react-router-dom';
import CubeModel from '../../models/cube';


class DeleteBtn extends React.Component {

  handleDeleteClick = () => {
    const cubeId = this.props.cube_id;
    CubeModel.delete(cubeId)
    .then((data) => {
      this.props.history.push('/dashboard');
    });
  }

  render() {
    return(
      <> 
        <button type="button" className="button btn-ctrl" data-toggle="modal" data-target="#deleteConfirmModal">
          Delete Cube
        </button>
        <div className="modal" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Cube</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this cube?
              </div>
              <div className="modal-footer">
                <input type="button" value="Cancel" className="btn btn-secondary" data-dismiss="modal" />
                <input 
                  onClick={this.handleDeleteClick}
                  type="button" 
                  value="Delete" 
                  className="btn btn-danger"
                  data-dismiss="modal" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(DeleteBtn);