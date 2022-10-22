import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import CubeModel from '../models/cube';
import UserModel from '../models/user';
import CategoryModel from '../models/category';
import { UserContext, CategoryContext, CubeContext } from '../context/ContextProvider';


function CubeEdit({history, match:{params:{id:cubeId}}}) {
  let formData;
  const { userContent, setUserContent, userContent: { categories } } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);

  const visualAidInputRef = useRef(null);

  const[question, setQuestion] = useState('');
  const[answer, setAnswer] = useState('');
  const[hint, setHint] = useState('');
  const[notes, setNotes] = useState('');
  const[link, setLink] = useState('');
  const[link_alias, setLinkAlias] = useState('');
  const[visual_aid, setVisualAid] = useState('');
  const[new_visual_aid, setNewVisualAid] = useState('');
  const[removingVisualAid, setRemovingVisualAid] = useState(false);

  const[questionCount, setQuestionCount] = useState(0);
  const[answerCount, setAnswerCount] = useState(0);
  const[hintCount, setHintCount] = useState(0);
  const[notesCount, setNotesCount] = useState(0);
  const[linkAliasCount, setLinkAliasCount] = useState(0);
  
  const[categoryError, setCategoryError] = useState('');
  const[questionError, setQuestionError] = useState('');
  const[answerError, setAnswerError] = useState('');
  const[visualAidError, setVisualAidError] = useState('');

  const[newCategory, setNewCategory] = useState('');
  const[newCategoryCount, setNewCategoryCount] = useState(0);
  const[categoryIsNew, setCategoryIsNew] = useState(false);
  const[isLoading , setIsLoading ] = useState(false);

  const updateCube = async () => {
    const data = await CubeModel.update(formData, cubeId)
    if (data.cubeError) {
      setIsLoading(false);
      data.question === '' && setQuestionError('Required');
      data.answer === '' && setAnswerError('Required');
      data.category === 'undefined' && setCategoryError('Required');
    } else {
      const categoriesAndCubes = await UserModel.allCubesAndCategories(userContent.user_id)
      setUserContent({...categoriesAndCubes, user_id: userContent.user_id });
      setIsLoading(false);
      history.push(`/dashboard/${cubeId}`);
    }
  }


  useEffect(() => {  
    (async function() {
      const data = await CubeModel.getOne(cubeId)
      setQuestion(data.cube.question);
      setAnswer(data.cube.answer);
      setHint(data.cube.hint);
      setNotes(data.cube.notes);
      setLink(data.cube.link);
      setLinkAlias(data.cube.link_alias);
      setVisualAid(data.cube.visual_aid);
      setQuestionCount(data.cube.question.length)
      setAnswerCount(data.cube.answer.length)
      setHintCount(data.cube.hint.length)
      setNotesCount(data.cube.notes.length)
      setLinkAliasCount(data.cube.link_alias.length)
    })();
    if (currentCategory === null) {
      setCategoryIsNew(true);
    } else {
      setCategoryIsNew(false);
    }
  }, [cubeId, currentCategory, new_visual_aid])

  const collectCubeFormData = (categoryId) => {
    formData = new FormData(document.getElementById('cube-edit-form'));
    formData.append('user', userContent.user_id);
    formData.append('category', categoryId);
    formData.append('removingVisualAid', removingVisualAid);
    !visualAidError && updateCube();
  };

  const checkFileExtention = (e) => {
    let ext = (e.target.files[0].name).substr((e.target.files[0].name).lastIndexOf('.'));
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
      setNewVisualAid(e.target.files[0]);
      setVisualAidError('');
    } else {
      setNewVisualAid(e.target.files[0]);
      setVisualAidError('Only .jpg, .jpeg, .png, and .gif allowed');
    }
  }

  const removeVisualAid = (e) => {
    e.preventDefault();
    visualAidInputRef.current.value = '';
    setNewVisualAid('');
    setVisualAidError('');
    setRemovingVisualAid(false);
  }

  const removeSavedVisualAid = (e) => {
    e.preventDefault();
    visualAidInputRef.current.value = null;
    setNewVisualAid('');
    setVisualAid('');
    setVisualAidError('');
    setRemovingVisualAid(true);
  }


  const createNewCategory = async () => {
    const newCategoryData = {
      title: newCategory,
      user: userContent.user_id
    };
    const data = await CategoryModel.create(newCategoryData)
    const { _id : newCategoryId } = data;
    collectCubeFormData(newCategoryId);
  }

  const handleCategoryChange = (e) => {
    if (e.target.value === 'New Category') {
      setCategoryIsNew(true);
      setCurrentCategory(null);
    } else {
      setCategoryIsNew(false);
      setCurrentCategory(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    categoryIsNew ? createNewCategory() : collectCubeFormData(currentCategory);
  }

  const handleCancelClick = (e) => {
    const currentCubeCat = categories.find(category => category.cubes.includes(currentCubeId)); 
    setCurrentCategory(currentCubeCat._id);
  }


  const errorStyle = {
    color: "red",
    fontSize: "12px",
  }

  const required = {
    color: "#ffc107"
  }

  return <>
    <div className="form-container container-column">
      <h1 className="form-title">Edit this Study Cube</h1>  
      <p className="required-warning">( Fields marked with a <span style={required}>*</span> are required )</p>
      <form 
      onSubmit={handleSubmit}
      encType="multipart/form-data" 
      id="cube-edit-form" 
      className="cube-form">

        <div className="form-row">
          <div className={`form-group ${categoryIsNew ? "col-md-5" : "col-md-11"}`}>
            <label htmlFor="category-dropdown">Category <span style={required}>*</span>            
            {categoryError && !categoryIsNew && !currentCategory &&
            <span style={errorStyle}>{` ${categoryError}`}</span>
            }</label>
            <select 
              className="form-control theme-transition" 
              id="category-dropdown"
              onChange={handleCategoryChange}
              value={
                currentCategory ? currentCategory : 
                categoryIsNew ? 'New Category' : ''}>
                <option value="" disabled> -- select an option -- </option>
                <option value="New Category">New Category</option>
              {userContent?.categories?.map(category => (
                <option key={`${category._id}`} value={`${category._id}`}>{`${category.title}`}</option>
              ))
              }
            </select>
          </div>

          {categoryIsNew &&
          <div className="form-group col-md-5">
            <label htmlFor="inputCategory">New Category <span style={required}>*</span>
            {categoryError && !newCategory &&
            <span style={errorStyle}>{` ${categoryError}`}</span>
            }</label>
            <input 
              type="text" 
              className="form-control theme-transition" 
              id="inputCategory" 
              placeholder="Create a new category"
              maxLength="20"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value)
                setNewCategoryCount(e.target.value.length)
              }} />
            <div className="character-count" style={{float: 'right'}}>
              <span className="currentCount">{newCategoryCount}</span>
              <span className="maxCount">/ 20</span>
            </div>
          </div>
          }
        </div>

        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputQuestion">Question <span style={required}>*</span>
            {questionError && !question &&
            <span style={errorStyle}>{` ${questionError}`}</span>
            }</label>
            <textarea 
            type="text" 
            className="form-control theme-transition" 
            id="inputQuestion" 
            placeholder="The quetsion goes here..."
            maxLength="300"
            name="question" 
            value={question || ''}
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
            <label htmlFor="inputAnswer">Answer <span style={required}>*</span>
            {answerError && !answer &&
            <span style={errorStyle}>{` ${answerError}`}</span>
            }</label>
            <textarea 
            type="text" 
            className="form-control theme-transition" 
            id="inputAnswer" 
            placeholder="The answer goes here..."
            maxLength="300"
            name="answer" 
            value={answer || ''}
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
            className="form-control theme-transition" 
            id="inputHint" 
            placeholder="Give yourself a nudge in the right direction."
            maxLength="300"
            name="hint" 
            value={hint || ''}
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
            className="form-control theme-transition" 
            id="inputNotes" 
            placeholder="Anything to help with memorization..."
            maxLength="300"
            name="notes" 
            value={notes || ''}
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
            className="form-control theme-transition" 
            id="inputLink" 
            placeholder="Link to a resource."
            name="link" 
            value={link || ''}
            onChange={(e) => setLink(e.target.value)} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputAlias">Link Alias</label>
            <input 
            type="text" 
            className="form-control theme-transition" 
            id="inputAlias" 
            placeholder="ex. 'Resource'"
            maxLength="50"
            name="link_alias" 
            value={link_alias || ''}
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
            <div htmlFor="inputVisual">Visual Aid</div>
            <label className="btn custom-file-upload theme-transition" htmlFor="inputVisual">{visual_aid ? 'Upload New': 'Upload'}</label>
            <input 
              ref={visualAidInputRef}
              type="file" 
              className="form-control-file" 
              id="inputVisual" 
              placeholder="Choose file"
              name="visual_aid"
              onChange={checkFileExtention} />
            {new_visual_aid && visualAidError &&
            <div style={errorStyle}>{`${visualAidError}`}</div>
            }
            {new_visual_aid 
              ? <>
                  {new_visual_aid.name.length > 15 
                    ? <span className="visual-aid-file-name">{new_visual_aid.name.slice(0, 6)}&hellip;{new_visual_aid.name.slice(-7)} </span> 
                    : <span className="visual-aid-file-name">{new_visual_aid.name} </span>
                  }
                  <span 
                    className=""
                    type="button"
                    onClick={removeVisualAid}
                    title= "Delete Visual Aid"
                    aria-label="Delete Visual Aid">
                      <i className="prefix grey-text"><FontAwesomeIcon icon={faTimesCircle} /> </i>
                  </span>
                </>
              : visual_aid 
                  ? <div className="visual-aid-preview-container">
                      <img src={visual_aid} alt="visual aid" className="visual-aid-preview"/>                   
                      <span 
                        className="delete-visual-aid"
                        type="button"
                        onClick={removeSavedVisualAid}
                        title= "Delete Visual Aid"
                        aria-label="Delete Visual Aid">
                          <i className="prefix grey-text"><FontAwesomeIcon icon={faTimesCircle} /> </i>
                      </span>
                    </div>
                  : null
            }
          </div>
        </div>
        <div className="form-buttons form-row">
          <div className="form-group col-md-5">
          </div>
          <div className="form-group col-md-5">
            <Link to={`/dashboard/${cubeId}`}>
              <button 
                type="submit" 
                className="btn form-btn btn-secondary"
                onClick={handleCancelClick}>
                Cancel
              </button>
            </Link>
            <button 
            disabled={isLoading ? true : false}
            type="submit" 
            className="btn form-btn btn-warning">
              {isLoading 
                ? <i className="fa-cubes-opened"> <FontAwesomeIcon icon={faSquareFull} spin size={'3x'} /> </i>
                : 'Save Changes'
              }  
            </button>
          </div>
        </div>
      </form>
    </div>
  </>
}

export default CubeEdit;