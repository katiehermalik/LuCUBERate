import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider';
import CubeModel from '../models/cube';

let formData;

function CubeNew(props) {
  const[question, setQuestion] = useState('');
  const[answer, setAnswer] = useState('');
  const[hint, setHint] = useState('');
  const[notes, setNotes] = useState('');
  const[link, setLink] = useState('');
  const[link_alias, setLinkAlias] = useState('');
  const[visual_aid, setVisualAid] = useState('');
  const[questionCount, setQuestionCount] = useState(0);
  const[answerCount, setAnswerCount] = useState(0);
  const[hintCount, setHintCount] = useState(0);
  const[notesCount, setNotesCount] = useState(0);
  const[linkAliasCount, setLinkAliasCount] = useState(0);
  const[questionError, setQuestionError] = useState('');
  const[answerError, setAnswerError] = useState('');
  const[visualAidError, setVisualAidError] = useState('');

  const createCube = () => {
    CubeModel.create(formData)
    .then((data) => {
      if (data.cubeError) {
        if (data.question === "" && data.answer === "") {
          setQuestionError('A question is required')
          setAnswerError('An answer is required')
        } else if (data.question === "") {
          setQuestionError('A question is required')
          setAnswerError('')
        } else if (data.answer === "") {
          setAnswerError('An answer is required')
          setQuestionError('')
        }
      } else {
        props.history.push(`/dashboard/${data.cube._id}`);
      }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuestionError('')
    setAnswerError('')
    formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer );
    formData.append("hint", hint);
    formData.append("notes", notes);
    formData.append("link", link);
    formData.append("link_alias", link_alias);
    formData.append("visual_aid", visual_aid);
    formData.append("user", localStorage.getItem("user"));
    if (visual_aid) {
      let ext = (visual_aid.name).substr((visual_aid.name).lastIndexOf('.'))
      console.log(ext)
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
        setVisualAidError('')
        createCube()
      } else {
        setVisualAidError('Only .jpg, .jpeg, .png, and .gif allowed')
      }
    } else {
      createCube()
    }
  }

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    whiteSpace: "nowrap"
  }

  return(
    <>
      <div className="form-container container-column">
        <h1 className="form-title">Create a New Study Cube</h1>
        <p className="required-warning">( Fields marked with a * are required )</p>
        <form 
        onSubmit={handleSubmit}
        encType="multipart/form-data" 
        id="cube-new-form" 
        className="cube-form">
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputQuestion">Question *              
              {questionError &&
              <span style={errorStyle}>{` ${questionError}`}</span>
              }</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputQuestion" 
              placeholder="The quetsion goes here..."
              maxLength="300"
              name="question" 
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value)
                setQuestionCount(e.target.value.length)
              }} />                    
              <div 
              className="character-count" 
              style={{float: 'right'}}>
                <span className="currentCount">{questionCount}</span>
                <span className="maxCount">/ 300</span>
              </div>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputAnswer">Answer *               
              {answerError &&
              <span style={errorStyle}>{` ${answerError}`}</span>
              }</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputAnswer" 
              placeholder="The answer goes here..."
              maxLength="300"
              name="answer" 
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
                setAnswerCount(e.target.value.length)
              }} />
              <div className="character-count" style={{float: 'right'}}>
                <span className="currentCount">{answerCount}</span>
                <span className="maxCount">/ 300</span>
              </div>
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
              maxLength="300"
              name="hint" 
              value={hint}
              onChange={(e) => {
                setHint(e.target.value)
                setHintCount(e.target.value.length)
              }} />
              <div className="character-count" style={{float: 'right'}}>
                <span className="currentCount">{hintCount}</span>
                <span className="maxCount">/ 300</span>
              </div>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputNotes">Notes</label>
              <textarea 
              type="text" 
              className="form-control" 
              id="inputNotes" 
              placeholder="Anything to help with memorization..."
              maxLength="300"
              name="notes" 
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                setNotesCount(e.target.value.length)
              }} />
              <div className="character-count" style={{float: 'right'}}>
                <span className="currentCount">{notesCount}</span>
                <span className="maxCount">/ 300</span>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputLink">Link</label>
              <input 
              type="text" 
              className="form-control" 
              id="inputLink" 
              placeholder="Link to a resource."
              name="link" 
              value={link}
              onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputAlias">Link Alias</label>
              <input 
              type="text" 
              className="form-control" 
              id="inputAlias" 
              placeholder="ex. 'Resource'"
              maxLength="50"
              name="link_alias" 
              value={link_alias}
              onChange={(e) => {
                setLinkAlias(e.target.value)
                setLinkAliasCount(e.target.value.length)
              }} />
              <div className="character-count" style={{float: 'right'}}>
                <span className="currentCount">{linkAliasCount}</span>
                <span className="maxCount">/ 50</span>
              </div>
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
              {visualAidError &&
              <span style={errorStyle}>{`${visualAidError}`}</span>
              }
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
            <MyContext.Consumer>
              {(value) => (
                <button 
                  onClick={value.updateCubeList}
                  type="submit" 
                  className="btn form-btn btn-warning">
                  Generate New Cube</button>
              )}
            </MyContext.Consumer>
          </div>
        </form>
      </div>
    </>
  )

}

export default CubeNew;