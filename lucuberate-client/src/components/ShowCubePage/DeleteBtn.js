import { useContext }from 'react';
import { withRouter } from 'react-router-dom';
import CubeModel from '../../models/cube';
import CubeContext from '../../context/ContextProvider';


const DeleteBtn = (props) => {
  const { setCubeList } = useContext(CubeContext);

  const handleDeleteClick = () => {
    const cubeId = props.cube_id;
    CubeModel.delete(cubeId)
    .then((data) => {
      setCubeList(data);
      props.history.push('/dashboard');
    });
  }

  return(
    <> 
      <button type="button" className="button delete-modal-btn btn-ctrl" data-toggle="modal" data-target="#deleteConfirmModal">
        Delete Cube
      </button>
      <div className="modal delete-modal" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <div className="modal-footer delete">
              <input type="button" value="Cancel" className="btn btn-secondary" data-dismiss="modal" />
                <input 
                  onClick={() => {
                    handleDeleteClick(); 
                  }}
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

export default withRouter(DeleteBtn);