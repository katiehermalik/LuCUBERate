import React, { useContext, useEffect, useRef, useReducer, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext, CategoryContext, CubeContext } from '../../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PlaceHolderCube from './PlaceHolderCube';
import DeleteBtn from '../ShowCubePage/DeleteBtn';
import CategoryShuffle from './CategoryShuffle';
import CubeCtrls from '../ShowCubePage/CubeCtrls';

function currentPathReducer(prevState, action) {
  switch (action.type) {
    case 'edit':
      return prevState[0] !== action.type ? [action.type, action.pathname.split('/')[2]] : prevState
    case 'new':
      return prevState[0] !== action.type ? [action.type, null] : prevState
    case 'dashboard':
      return prevState[0] !== action.type ? [action.type, null] : prevState
    default:
      return (prevState[0] !== 'show' && prevState[1] !== action.pathname.match(/\b[\w]+$/g)[0]) ? ['show', action.pathname.match(/\b[\w]+$/g)[0]] : prevState
  }
}

const CubeList = ({ history, history:{location:{pathname}}}) => {

  const { userContent: { categories } } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const currentCubeRefs = useRef([]);
  const currentCategoryRefs = useRef([]);
  const { current: cubeRefs } = currentCubeRefs || [];
  const { current: categoryRefs } = currentCategoryRefs || [];
  const [ currentCategoryRef, setCurrentCategoryRef ] = useState(null);
  const [ currCategoryCubeRefs, setCurrCategoryCubeRefs ] = useState([]);
  const [ currentPath, setCurrentPath ] = useReducer(currentPathReducer, []);
  const [ currentCubeCategory, setCurrentCubeCategory ] = useState('');
  
  // console.log('============================================================================================================================================');
  // console.log('cubeRefs ------->', cubeRefs);
  // console.log('categoryRefs ------->', categoryRefs);
  // console.log('categories ------->', categories);
  // console.log('currentPath ------->', currentPath);
  // console.log('currentCubeId ------->', currentCubeId);
  // console.log('currentCubeCategory ------->', currentCubeCategory);
  // console.log('currentCategory ------->', currentCategory);
  // console.log('currentCategoryRef ------->', currentCategoryRef);
  // console.log('currCategoryCubeRefs ------->', currCategoryCubeRefs);
  // console.log('============================================================================================================================================');

//====================================================================================//

  const closeAllCategories = useCallback(() => {
    categoryRefs.forEach(ref => {
      ref.classList.remove("active");
      ref.nextElementSibling.style.maxHeight = "0px"
    })
  }, [categoryRefs])

  const openCategoryCubeList = useCallback(() => {
    currentCategoryRef.classList.add("active");
    currentCategoryRef.nextElementSibling.style.maxHeight = "200px";
  }, [currentCategoryRef])

  const scrollToCube = useCallback((isCurrentCubeCategory) => {
    closeAllCategories();
    openCategoryCubeList();
    let foundCubeRef;
    switch (true) {
      case ((currentPath[0] ==='edit'|| currentPath[0] ==='show') && isCurrentCubeCategory) :
        foundCubeRef = currCategoryCubeRefs.find(cube => cube.ref.value === currentCubeId);
        foundCubeRef && (foundCubeRef.ref.checked = true); 
        break;
      case (currentPath[0] ==='edit'|| currentPath[0] ==='new') :
        const indexOfNewestCubeRef = currCategoryCubeRefs.length - 1
        foundCubeRef = currCategoryCubeRefs[indexOfNewestCubeRef];
        break;
      default:
        break;
      }
    foundCubeRef && foundCubeRef.ref.scrollIntoView({behavior: 'smooth', block: 'center'});
  },[currentCubeId, closeAllCategories, currCategoryCubeRefs, openCategoryCubeList, currentPath])

  const findCurrentCubeId = useCallback(() => {
    console.log('findCurrentCubeId - FINDING CURRENT CUBE ID');
    setCurrentCubeId(currentPath[1]);
  }, [currentPath, setCurrentCubeId])

  const resetCubeId = useCallback(() => {
    console.log('resetCubeId - FINDING CURRENT CUBE ID');
    setCurrentCubeId('');
    setCurrentCubeCategory('');
  }, [setCurrentCubeId])

  const findCurrentCategoryInfo = useCallback(() => {
    console.log('FINDING CURRENT CATEGORY INFO');
    setCurrentCategoryRef(categoryRefs.find(ref => ref.id === currentCategory));
    setCurrCategoryCubeRefs(cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCategory));
  }, [categoryRefs, cubeRefs, currentCategory])

  const findCurrentCubeCategory = useCallback(() => {
    console.log('FINDING CURRENT CUBE CATEGORY');
      const currentCubeCat = categories.find(category => category.cubes.includes(currentCubeId));
      setCurrentCubeCategory(currentCubeCat._id)
      setCurrentCategory(currentCubeCat._id)
      setCurrentCategoryRef(categoryRefs.find(ref => ref.id === currentCubeCat._id))
      setCurrCategoryCubeRefs(cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCubeCat._id))
  },[categoryRefs, cubeRefs, categories, setCurrentCategory, currentCubeId])

//====================================================================================//

  useEffect(() => {
    console.log('IN USE EFFECT');
    currentCategory ?? closeAllCategories();
    setCurrentPath({type: pathname.match(/\b[\w]+$/g)[0], pathname});

    if (cubeRefs.length !== 0 && categoryRefs.length !== 0) {
      if ((currentCategory && !currentCategoryRef) || (currentCategory && currentCategory !== currentCategoryRef.id)) {
        findCurrentCategoryInfo();
      } 

      // Upon browser refresh - gathers needed info differently depending on the path
      if ((currentPath[0] === 'edit' || currentPath[0] === 'show')) {
        if(!currentCubeId) {
          findCurrentCubeId();
        } else if (currentCubeId && currentCubeCategory && !currentCategoryRef) {
          findCurrentCategoryInfo();
        } else if (currentCubeId && !currentCubeCategory) { 
          findCurrentCubeCategory();
        } 
      } else if ((currentPath[0] === 'dashboard' || currentPath[0] === 'new') && (currentCubeId || currentCubeCategory)) {
        resetCubeId();
      } 

      // Handles opening and closing of categories differently, depending on the path
      if (currentCategory && currentCategoryRef && currCategoryCubeRefs.length !== 0) {
        switch (currentPath[0]) {
          case 'edit':
            if (currentCategory === currentCubeCategory) {
              scrollToCube(true);
            } else {
              scrollToCube(false);
            }
            break;
          case 'show':
            if (currentCategory === currentCubeCategory) {
              scrollToCube(true);
            } else {
              closeAllCategories();
              openCategoryCubeList();
            }
            break;
          case 'dashboard':
            currCategoryCubeRefs.forEach(cube => cube.ref.checked = false)
            closeAllCategories();
            openCategoryCubeList();
            break;
          case 'new':
            currCategoryCubeRefs.forEach(cube => cube.ref.checked = false);
            scrollToCube(false);
            break;
          default:
            break;
        }
      }
    }
  }, [categories, pathname, cubeRefs.length, categoryRefs.length, currentCategory, currentCategoryRef, currentCubeId, currentCubeCategory, currentPath, closeAllCategories, openCategoryCubeList, findCurrentCategoryInfo, findCurrentCubeCategory, findCurrentCubeId, resetCubeId, currCategoryCubeRefs, scrollToCube])

  //====================================================================================//

  const handleCategoryClick = (e) => {
    e.preventDefault();
    const { target: { nextElementSibling : categoryCubeList }} = e;
    if (categoryCubeList.style.maxHeight === "0px") {
      // if opening a new category
      setCurrentCategory(e.target.id);
    } else {
      // if closing current category, close targeted category and go to dashboard.
        currCategoryCubeRefs.forEach(cube => cube.ref.checked = false)
        categoryCubeList.style.maxHeight = "0px";
        e.target.classList.remove("active");
        setCurrentCategory(null);
        setCurrentCategoryRef(null);
        setCurrCategoryCubeRefs([]);
        history.push(`/dashboard`);
    }
  }

  const handleCubeClick = (e) => {
    const currentCubeCat = categories.find(category => category.cubes.includes(e.target.value));
    setCurrentCubeId(e.target.value);
    setCurrentCubeCategory(currentCubeCat._id);
    history.push(`/dashboard/${e.target.value}`);
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center'});
  }

  //====================================================================================//

  const cubeListStyles = {
    overflow: "auto",
    maxHeight: "0px",
    transition: "max-height 0.4s ease-out 0s",
    position: "relative",
  }
  
  return <div className="cube-list-grp container-column">
    {categories?.map((category, i) => <div className="cube-list" key={category._id}>
        <div
          onClick={handleCategoryClick} 
          type="button" 
          className="category-btn"
          id={category._id}
          ref= {element => { 
            if (element) {
              cubeRefs[i] = [];
              categoryRefs[i] = element;
            }
          }}>
          {category.title}
          {currentCategory === category._id ?
          <div>
            <span className="category-action-grp">
              <CategoryShuffle />
              <DeleteBtn categoryId={category._id} categoryTitle={category.title} />
            </span>
            <i className="icon-chevron"><FontAwesomeIcon icon={faChevronDown} /></i>
          </div>
          : 
            <i className="icon-chevron"><FontAwesomeIcon icon={faChevronRight} /></i>
          }
        </div>
        <div 
        style= {cubeListStyles} 
        className="content container-column cube-select-group">
          {category.cubes?.map((cube, j) => (
          <li 
            key={cube}
            className="radio-button">
            <input
              type="radio"
              name="cube-select"
              value={cube}
              id={cube}
              category={category._id}
              onClick={handleCubeClick}
              ref={element => {
                if (element) {
                  cubeRefs[i][j] = {category_id: category._id, ref: element};
                }
              }}/>
            <label
              className="radio-label"
              htmlFor={cube}>
                {`Cube ${j + 1}`}
            </label>
            {currentCubeId === cube && 
            <CubeCtrls cubeId={cube} />
            }
          </li>
          ))}  
          {((currentPath[0] === 'edit' && currentCategory !== currentCubeCategory && currentCubeCategory !== category._id) || 
            currentPath[0] === 'new') &&
            <PlaceHolderCube 
              currentPath={currentPath} 
              currentCubeCategory={currentCubeCategory} />
          }
        </div>
      </div>
    )}
    <footer className="list-footer container-column">
      <p>{`Copyright \u00A9 ${new Date().getFullYear()} LuCUBERate`}</p>
    </footer>
  </div>
}

export default withRouter(CubeList);

