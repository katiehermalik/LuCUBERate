import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CubeModel from '../models/cube';

function CubeEdit(props) {
  const[question, setQuestion] = useState('');
  const[answer, setAnswer] = useState('');
  const[hint, setHint] = useState('');
  const[notes, setNotes] = useState('');
  const[link, setLink] = useState('');
  const[link_alias, setLinkAlias] = useState('');
  const[visual_aid, setVisualAid] = useState('');

  useEffect(() => {
    
    const cubeId = props.match.params.id;
    CubeModel.getOne(cubeId)
    .then((data) => {
      setQuestion(data.cube.question);
      setAnswer(data.cube.answer);
      setHint(data.cube.hint);
      setNotes(data.cube.notes);
      setLink(data.cube.links);
      setLinkAlias(data.cube.link_alias);
      setVisualAid(data.cube.visual_aid);
    });
  }, [props.match.params.id])

  const handleFormSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer );
    formData.append("hint", hint);
    formData.append("notes", notes);
    formData.append("link", link);
    formData.append("link_alias", link_alias);
    formData.append("visual_aid", visual_aid);
    const cubeId = props.match.params.id;
    formData.append("cubeId", cubeId);
    CubeModel.update(formData, cubeId)
      .then((data) => {
        props.history.push(`/dashboard/${cubeId}`);
      });
  };

  return(
    <>
      <div className="form-container container-column">
        <h1 className="form-title">Edit this Study Cube</h1>
        <form 
        onSubmit={handleFormSave}
        encType="multipart/form-data" 
        id="cube-edit-form" 
        className="cube-form">
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputQuestion">Question</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputQuestion" 
              placeholder="What would you like to study?"
              name="question" 
              value={question || ''}
              onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputAnswer">Answer</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputAnswer" 
              placeholder="The answer goes here."
              name="answer" 
              value={answer || ''}
              onChange={(e) => setAnswer(e.target.value)} />
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
              value={hint || ''}
              onChange={(e) => setHint(e.target.value)} />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputNotes">Notes</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputNotes" 
              placeholder="Anything to help with memorization..."
              name="notes" 
              value={notes || ''}
              onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputLink">Link</label>
              <input 
              type="text" 
              className="form-control" 
              id="inputLink" 
              placeholder="Add a link as a resource."
              name="link" 
              value={link || ''}
              onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputAlias">Link Alias</label>
              <input 
              type="text" 
              className="form-control" 
              id="inputAlias" 
              placeholder="Semantically name the link."
              name="link_alias" 
              value={link_alias || ''}
              onChange={(e) => setLinkAlias(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputVisual">Visual Aid</label>
              <input 
              type="file" 
              className="form-control-file" 
              id="inputVisual" 
              placeholder="Choose file"
              name="visual_aid" 
              onChange={(e) => setVisualAid(e.target.files[0])} />
            </div>
          </div>
            <div className="form-buttons">
            <Link to={`/dashboard/${props.match.params.id}`}>
              <button 
                type="submit" 
                className="btn form-btn btn-secondary"
                >
                Cancel
              </button>
            </Link>
            <button 
            type="submit" 
            className="btn form-btn btn-warning">
            Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CubeEdit;