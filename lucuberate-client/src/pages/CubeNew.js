import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, CategoryContext, CubeContext } from '../context/ContextProvider';
import CubeModel from '../models/cube';
import CategoryModel from '../models/category';

const CubeNew = ({ history }) => {
  let formData;
  const { userContent, setUserContent } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);

  // const [ cubeData, setCubeData ] = useState({
  //   question: '',
  //   answer: '',
  //   hint: '',
  //   notes: '',
  //   link: '',
  //   link_alias: '',
  //   visual_aid: '',
  //   questionCount: 0,
  //   answerCount: 0,
  //   hintCount: 0,
  //   notesCount: 0,
  //   linkAliasCount: 0,
  //   questionError: '',
  //   answerError: '',
  //   visualAidError: '',
  //   category: '',
  //   categoryCount: 0
  // });

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

  const[newCategory, setNewCategory] = useState('');
  const[newCategoryCount, setNewCategoryCount] = useState(0);
  const[categoryIsNew, setCategoryIsNew] = useState(false);

  useEffect(() => {
    if (currentCubeId) {
      setCurrentCubeId('');
    }
    if (currentCategory === null) {
      setCategoryIsNew(true);
    } else {
      setCategoryIsNew(false);
      // let currCubeCategory = cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCategory)
    }
  }, [currentCubeId, setCurrentCubeId, currentCategory])

  const createCube = () => {
    CubeModel.create(formData)
    .then((data) => {
      if (data.cubeError) {
        switch (true) {
          case data.question === '' && data.answer === '':
            setQuestionError('A question is required')
            setAnswerError('An answer is required');
            break;
          case data.question === '':
            setQuestionError('A question is required');
            setAnswerError('');
            break;
          case data.answer === '':
            setAnswerError('An answer is required');
            setQuestionError('')
            break;
          default:
            break;
        }
      } else {
        // const updatedCubeList = [...userContent.cubes, data.cube]
        let updatedCategoryList;
        if (categoryIsNew) {
          updatedCategoryList = [
            ...userContent.categories, 
            {_id: data.category._id, title: data.category.title, cubes: [data.cube._id]}
          ]
        } else {
          const foundCategory = userContent.categories.find(category => category._id === data.category._id);
          foundCategory.cubes.push(data.cube._id);
        }
        setUserContent(prevState => ({ 
          ...prevState, 
          // cubes: updatedCubeList, 
          categories: categoryIsNew ? updatedCategoryList : prevState.categories
        }));
        setCurrentCubeId(data.cube._id);
        // setCurrentCategory(data.category._id);
        history.push(`/dashboard/${data.cube._id}`);
      }
    });
  }

  const collectCubeFormData = (categoryId) => {
    setQuestionError('');
    setAnswerError('');
    formData = new FormData(document.getElementById('cube-new-form'));
    formData.append('user', userContent.user_id);
    formData.append('category', categoryId);
    if (visual_aid) {
      let ext = (visual_aid.name).substr((visual_aid.name).lastIndexOf('.'));
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
        setVisualAidError('');
        createCube();
      } else {
        setVisualAidError('Only .jpg, .jpeg, .png, and .gif allowed');
      }
    } else {
      createCube();
    }
  }

  const createNewCategory = () => {
    const newCategoryData = {};
    newCategoryData.title = newCategory;
    newCategoryData.user = userContent.user_id;
    CategoryModel.create(newCategoryData)
    .then((data) => {
        const { _id : newCategoryId } = data;
        collectCubeFormData(newCategoryId);
      }
    );
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
    categoryIsNew ? createNewCategory() : collectCubeFormData(currentCategory);
  }

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    whiteSpace: "nowrap"
  }

  return <>
    <div className="form-container container-column">
      <h1 className="form-title">Create a New Study Cube</h1>
      <p className="required-warning">( Fields marked with a * are required )</p>
      <form 
      onSubmit={handleSubmit}
      encType="multipart/form-data" 
      id="cube-new-form" 
      className="cube-form">
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputCategory">Category *</label>
            <select 
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

          { categoryIsNew &&
          <div className="form-group col-md-3">
            <label htmlFor="inputCategory">New Category *</label>
            <input 
              type="text" 
              className="form-control" 
              id="inputCategory" 
              placeholder="Create a new category"
              maxLength="25"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value)
                setNewCategoryCount(e.target.value.length)
              }} />
            <div className="character-count" style={{float: 'right'}}>
              <span className="currentCount">{newCategoryCount}</span>
              <span className="maxCount">/ 25</span>
            </div>
          </div>
          }
        </div>

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
          <button 
            onClick={handleSubmit}
            type="submit" 
            className="btn form-btn btn-warning"
            >
            Generate New Cube
          </button>
        </div>
      </form>
    </div>
  </>
}


export default CubeNew;