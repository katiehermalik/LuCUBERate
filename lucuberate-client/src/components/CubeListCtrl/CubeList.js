import React, { useContext, useEffect, useRef, useReducer, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext, CategoryContext, CubeContext, QuestionsContext } from '../../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faCubes } from '@fortawesome/free-solid-svg-icons';
import PlaceHolderCube from './PlaceHolderCube';
import DeleteBtn from '../ShowCubePage/DeleteBtn';
import CategoryShuffle from './CategoryShuffle';
import CubeCtrls from '../ShowCubePage/CubeCtrls';

function currentPathReducer(prevState, action) {
  switch (action.type) {
    case 'edit':
      return prevState[0] !== action.type 
        ? [action.type, action.pathname.split('/')[2]] 
        : prevState
    case 'new':
    case 'dashboard':
      return prevState[0] !== action.type 
        ? [action.type, null] 
        : prevState
    default:
      return (prevState[1] !== action.pathname.match(/\b[\w]+$/g)[0] || prevState[0] !== 'show') 
        ? ['show', action.pathname.match(/\b[\w]+$/g)[0]]
        : prevState
  }
}

const CubeList = ({ history, history:{location:{pathname}}}) => {
  const { userContent: { categories } } = useContext(UserContext);
  const { userContent: { cubes } } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const { questionsAreVisible } = useContext(QuestionsContext);
  const currentCubeRefs = useRef([]);
  const currentCategoryRefs = useRef([]);
  const { current: cubeRefs } = currentCubeRefs || [];
  const { current: categoryRefs } = currentCategoryRefs || [];
  const [ currentCategoryRef, setCurrentCategoryRef ] = useState(null);
  const [ currCategoryCubeRefs, setCurrCategoryCubeRefs ] = useState([]);
  const [ currentPath, setCurrentPath ] = useReducer(currentPathReducer, []);
  const [ currentCubeCategory, setCurrentCubeCategory ] = useState('');
  const [ categoryWasShuffled, setCategoryWasShuffled ] = useState(false);
  
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
  // console.log('categoryWasShuffled ------->', categoryWasShuffled);
  // console.log('============================================================================================================================================');

//====================================================================================//

  const closeCategoryCubeList = useCallback(() => {
    if (currentCategory === null) {
      categoryRefs.forEach(ref => {
          ref.classList.remove("active");
          ref.nextElementSibling.style.maxHeight = "0px";
      })
    } else {
      categoryRefs.forEach(ref => {
        if (ref.id !== currentCategoryRef?.id && ref.className.split(' ').includes("active")) {
          ref.classList.remove("active");
          ref.nextElementSibling.style.maxHeight = "0px";
        }
      })
    }
  }, [categoryRefs, currentCategoryRef, currentCategory])

  const openCategoryCubeList = useCallback(() => {
    if (!currentCategoryRef.className.split(' ').includes("active")) {
    currentCategoryRef.classList.add("active");
    currentCategoryRef.nextElementSibling.style.maxHeight = "200px";
    }
  }, [currentCategoryRef])

  const scrollToCube = useCallback((isCurrentCubeCategory) => {
    closeCategoryCubeList();
    openCategoryCubeList();
    let foundCubeRef;
    switch (true) {
      case ((currentPath[0] ==='dashboard'|| currentPath[0] ==='show') && !isCurrentCubeCategory) :
        currCategoryCubeRefs[0].ref.scrollIntoView({behavior: 'smooth', block: 'center'});
        break;
      case ((currentPath[0] ==='edit'|| currentPath[0] ==='show') && isCurrentCubeCategory) :
        foundCubeRef = currCategoryCubeRefs.find(cube => cube.ref.value === currentCubeId);
        foundCubeRef && (foundCubeRef.ref.checked = true); 
        break;
      case (currentPath[0] ==='edit'|| currentPath[0] ==='new') :
        const indexOfNewestCubeRef = currCategoryCubeRefs.length - 1;
        foundCubeRef = currCategoryCubeRefs[indexOfNewestCubeRef];
        break;
      default:
        break;
      }
    foundCubeRef && foundCubeRef.ref.scrollIntoView({behavior: 'smooth', block: 'center'});
  },[currentCubeId, currCategoryCubeRefs, currentPath, closeCategoryCubeList, openCategoryCubeList])

  const findCurrentCubeId = useCallback(() => {
    setCurrentCubeId(currentPath[1]);
  }, [currentPath, setCurrentCubeId])

  const findCurrentPath = useCallback(() => {
    setCurrentPath({type: pathname.match(/\b[\w]+$/g)[0], pathname});
  }, [pathname])

  const resetCubeId = useCallback(() => {
    setCurrentCubeId('');
    setCurrentCubeCategory('');
  }, [setCurrentCubeId])

  const findCurrentCubeCategory = useCallback((currentCubeCatId) => {
    setCurrentCubeCategory(prevState => {
      if (prevState !== currentCubeCatId) {
        return currentCubeCatId;
      } else {
        return prevState;
      }
    });
    setCurrentCategory(prevState => {
      if (prevState !== currentCubeCatId) {
        return currentCubeCatId;
      } else {
        return prevState;
      }
    });
    setCurrentCategoryRef(categoryRefs.find(ref => ref.id === currentCubeCatId));
    setCurrCategoryCubeRefs(cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCubeCatId));
  },[setCurrentCategory, categoryRefs, cubeRefs])
  
  const findCurrentCategoryInfo = useCallback(() => {
    const foundCubeRefsArr = cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCategory);
    setCurrentCategoryRef(prevState => {
      if (prevState !== categoryRefs.find(ref => ref.id === currentCategory)) {
        return categoryRefs.find(ref => ref.id === currentCategory);
      } else {
        return prevState;
      }
    });
    setCurrCategoryCubeRefs(prevState => {
      if (prevState !== foundCubeRefsArr) {
        return foundCubeRefsArr;
      } else {
        return prevState;
      }
    });
  }, [categoryRefs, cubeRefs, currentCategory])

  const changeCubeListOpacity = useCallback(() =>{
    currentCategoryRef.nextElementSibling.style.opacity = "0";
    setTimeout(() => {
      currentCategoryRef.nextElementSibling.style.opacity = "1";
    }, 1000);
  },[currentCategoryRef])

  const categoryWasShuffledEvents = useCallback(() =>{
    setCurrCategoryCubeRefs(cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCategory));
    scrollToCube(true);
    history.push(`/dashboard/${currentCubeId}`);
    setCategoryWasShuffled(false);
  },[cubeRefs, currentCategory, currentCubeId, history, scrollToCube])

//====================================================================================//

  useEffect(() => {
    currentCategory ?? closeCategoryCubeList();
    findCurrentPath();
    if (cubeRefs.length !== 0 && categoryRefs.length !== 0) {
      currentCategory && (currentCategory !== currentCategoryRef?.id) && findCurrentCategoryInfo();
      categoryWasShuffled && categoryWasShuffledEvents();
      // Gathering needed cube and category info differently depending on the path
      switch (currentPath[0]) {
        case 'edit':
        case 'show':
          if (currentCubeId) {
            const currentCubeCat = categories.find(category => category.cubes.includes(currentCubeId));
            currentCubeCat._id !== currentCubeCategory && findCurrentCubeCategory(currentCubeCat._id);
          } else {
            findCurrentCubeId();
          }
          if (currentCategory && currentCategoryRef && currCategoryCubeRefs?.length !== 0) {
            (currentCategory === currentCubeCategory)
              ? scrollToCube(true) 
              : scrollToCube(false);
          }
          break;
        case 'dashboard':
        case 'new':
          resetCubeId();
          if (currentCategory && currentCategoryRef && currCategoryCubeRefs?.length !== 0) {
            currCategoryCubeRefs.forEach(cube => cube.ref.checked = false);
            scrollToCube(false);
          }
          break;
        default:
          break;
      }
    }
  }, [categories, pathname, findCurrentPath, cubeRefs.length, categoryRefs.length, currentCategory, currentCategoryRef, currentCubeId, currentCubeCategory, currentPath, closeCategoryCubeList, openCategoryCubeList, findCurrentCategoryInfo, findCurrentCubeCategory, findCurrentCubeId, resetCubeId, currCategoryCubeRefs, scrollToCube, categoryWasShuffled, categoryWasShuffledEvents])

  //====================================================================================//

  const handleCategoryClick = (e) => {
    e.preventDefault();
    const { target: { nextElementSibling : categoryCubeList }} = e;
    if (categoryCubeList.style.maxHeight === "0px") {
      // if opening a new category
      // setQuestionsAreVisible(false);
      setCurrentCategory(e.target.id);
    } else {
      // if closing current category, close targeted category and go to dashboard.
      currCategoryCubeRefs.forEach(cube => cube.ref.checked = false);
      categoryCubeList.style.maxHeight = "0px";
      e.target.classList.remove("active");
      // setQuestionsAreVisible(false);
      setCurrentCategory(null);
      setCurrentCategoryRef(null);
      setCurrCategoryCubeRefs([]);
      history.push(`/dashboard`);
    }
  }

  const handleCubeClick = (e) => {
    setCurrentCubeId(e.target.value);
    history.push(`/dashboard/${e.target.value}`);
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center'});
  }

  //====================================================================================//

  const cubeListStyles = {
    overflow: "auto",
    maxHeight: "0px",
    transition: "all 0.4s ease-out 0s",
    position: "relative",
  }
  const pointerDisable = {
    pointerEvents: "none"
  }
  const pointerAuto = {
    pointerEvents: "auto"
  }
  
  return <div className="cube-list-grp container-column">
    <fieldset>
      <legend hidden>Choose a Category</legend>
    {categories?.map((category, i) => 
      <div className="cube-list theme-transition" key={category._id}>
        <div
          onClick={handleCategoryClick} 
          type="button" 
          className="category-btn theme-transition"
          id={category._id}
          ref= {element => { 
            if (element) {
              cubeRefs[i] = [];
              categoryRefs[i] = element;
            }
          }}>{`${category.title}`}
          {currentCategory === category._id 
          ?
            <div className="container-row" style={pointerDisable}>
              <span className="fa-cubes-number" title={`${category.cubes.length} ${category.cubes.length > 1 ? 'cubes' : 'cube'}`}
              aria-label={`${category.cubes.length} ${category.cubes.length > 1 ? 'cubes' : 'cube'}`}>
              {`${category.cubes.length} `}
              </span>
              <i className="fa-cubes-opened"> <FontAwesomeIcon icon={faCubes} /> </i>
              <span style={pointerAuto} className="container-row">
              {currentCubeId && currentPath[0] === 'show' && currentCubeCategory === currentCategory && currCategoryCubeRefs.length > 1 &&
                <CategoryShuffle setCategoryWasShuffled={setCategoryWasShuffled} changeCubeListOpacity={changeCubeListOpacity} /> 
              }
                <DeleteBtn categoryId={category._id} categoryTitle={category.title} />
              </span>
              <i style={pointerDisable} className="icon-chevron"><FontAwesomeIcon icon={faChevronDown} /></i>
            </div>
          : 
            <div className="container-row" style={pointerDisable}>
              <span className="fa-cubes-number" title={`${category.cubes.length} ${category.cubes.length > 1 ? 'cubes' : 'cube'}`}
              aria-label={`${category.cubes.length} ${category.cubes.length > 1 ? 'cubes' : 'cube'}`}>
              {`${category.cubes.length} `} 
              </span>
              <i className="fa-cubes-closed"> <FontAwesomeIcon icon={faCubes} /> </i>
              <i style={pointerDisable} className="icon-chevron"><FontAwesomeIcon icon={faChevronRight} /></i>
            </div>
          }
        </div>
        <fieldset 
        style= {cubeListStyles} 
        className="content container-column cube-select-group">
        <legend hidden>Choose a Cube</legend>
          {category.cubes?.map((cube, j) => <li key={cube} className="radio-button">
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
                  {questionsAreVisible 
                    ? ((cubes.find(item => item._id === cube)).question).length > 60
                      ? ((cubes.find(item => item._id === cube)).question).slice(0, 60) + ' . . .'
                      : (cubes.find(item => item._id === cube)).question
                    : `Cube ${j + 1}`}
              </label>
              {currentCubeId === cube && 
              <CubeCtrls cubeId={cube} />
              }
            </li>
          )}  
          {((currentPath[0] === 'edit' && category._id !== currentCubeCategory) || 
            currentPath[0] === 'new') &&
            <PlaceHolderCube 
              currentPath={currentPath} 
              currentCubeCategory={currentCubeCategory} />
          }
        </fieldset>
      </div>
    )}
    </fieldset>
    <footer className="list-footer container-column theme-transition">
      <p>{`Copyright \u00A9 ${new Date().getFullYear()} LuCUBERate`}</p>
    </footer>
  </div>
}

export default withRouter(CubeList);

