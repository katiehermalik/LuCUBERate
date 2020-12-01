import React from 'react';
import { withRouter } from 'react-router-dom';
import CubeModel from '../models/cube';


class DeleteCube extends React.Component {

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
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#deleteConfirmModal">
          Delete Cube
        </button>
        <div class="modal" id="deleteConfirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Cube</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete this cube?
              </div>
              <div class="modal-footer">
                <input type="button" value="Cancel" class="btn btn-secondary" data-dismiss="modal" />
                <input 
                  onClick={this.handleDeleteClick}
                  type="button" 
                  value="Delete" 
                  class="btn btn-danger"
                  data-dismiss="modal" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(DeleteCube);