import React, {
  useContext,
  useReducer,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { withRouter } from "react-router-dom";
import {
  UserContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
} from "../../context/ContextProvider";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  PackageIcon,
} from "@primer/octicons-react";
import PlaceHolderCube from "./PlaceHolderCube";
import DeleteBtn from "./DeleteBtn";
import CategoryShuffle from "./CategoryShuffle";
import CubeCount from "./CubeCount";
import CubeCtrls from "../ShowCubePage/CubeCtrls";
import Footer from "../Footer";

function currentPathReducer(prevState, action) {
  switch (action.type) {
    case "edit":
      return prevState[0] !== action.type
        ? [action.type, action.pathname.split("/")[2]]
        : prevState;
    case "new":
    case "dashboard":
      return prevState[0] !== action.type ? [action.type, null] : prevState;
    default:
      return prevState[1] !== action.pathname.match(/\b[\w]+$/g)[0] ||
        prevState[0] !== "show"
        ? ["show", action.pathname.match(/\b[\w]+$/g)[0]]
        : prevState;
  }
}

const CubeList = ({
  history,
  history: {
    location: { pathname },
  },
}) => {
  const { currentUserInfo, isLoading } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const { questionsAreVisible } = useContext(QuestionsContext);

  const [currentPath, setCurrentPath] = useReducer(currentPathReducer, []);

  const currentCubeRefs = useRef([]);
  const currentCategoryRefs = useRef([]);
  const { current: cubeRefs } = currentCubeRefs || [];
  const { current: categoryRefs } = currentCategoryRefs || [];

  const [currentCategoryRef, setCurrentCategoryRef] = useState(null);
  const [currCategoryCubeRefs, setCurrCategoryCubeRefs] = useState([]);
  const [currentCubeCategory, setCurrentCubeCategory] = useState("");
  const [categoryWasShuffled, setCategoryWasShuffled] = useState(false);

  // console.log('============================================================================================================================================');
  // console.log('cubeRefs ------->', cubeRefs);
  // console.log('categoryRefs ------->', categoryRefs);
  // console.log('currentUserInfo.categories ------->', currentUserInfo.categories);
  // console.log('currentPath ------->', currentPath);
  // console.log('currentCubeId ------->', currentCubeId);
  // console.log('currentCubeCategory ------->', currentCubeCategory);
  // console.log('currentCategory ------->', currentCategory);
  // console.log('currentCategoryRef ------->', currentCategoryRef);
  // console.log('currCategoryCubeRefs ------->', currCategoryCubeRefs);
  // console.log('categoryWasShuffled ------->', categoryWasShuffled);
  // console.log('============================================================================================================================================');

  //====================================================================================//

  const findCurrentCubeId = useCallback(() => {
    setCurrentCubeId(currentPath[1]);
  }, [currentPath, setCurrentCubeId]);

  const findCurrentPath = useCallback(() => {
    setCurrentPath({ type: pathname.match(/\b[\w]+$/g)[0], pathname });
  }, [pathname]);

  const resetCubeId = useCallback(() => {
    setCurrentCubeId("");
    setCurrentCubeCategory("");
  }, [setCurrentCubeId]);

  const findCurrentCubeCategory = useCallback(
    currentCubeCatId => {
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
      setCurrentCategoryRef(
        categoryRefs.find(ref => ref.id === currentCubeCatId)
      );
      setCurrCategoryCubeRefs(
        cubeRefs.find(
          cubeRefArr => cubeRefArr[0].category_id === currentCubeCatId
        )
      );
    },
    [setCurrentCategory, categoryRefs, cubeRefs]
  );

  const findCurrentCategoryInfo = useCallback(() => {
    const foundCubeRefsArr = cubeRefs.find(
      cubeRefArr => cubeRefArr[0].category_id === currentCategory
    );
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
  }, [categoryRefs, cubeRefs, currentCategory]);

  //====================================================================================//

  const closeCategoryCubeList = useCallback(() => {
    if (currentCategory === null) {
      categoryRefs.forEach(ref => {
        ref.classList.remove("active");
        ref.nextElementSibling.style.maxHeight = "0px";
      });
    } else {
      categoryRefs.forEach(ref => {
        if (
          ref.id !== currentCategoryRef?.id &&
          ref.className.split(" ").includes("active")
        ) {
          ref.classList.remove("active");
          ref.nextElementSibling.style.maxHeight = "0px";
        }
      });
    }
  }, [categoryRefs, currentCategoryRef, currentCategory]);

  const openCategoryCubeList = useCallback(() => {
    if (!currentCategoryRef.className.split(" ").includes("active")) {
      currentCategoryRef.classList.add("active");

      currentCategoryRef.nextElementSibling.style.maxHeight =
        currentCategoryRef.nextElementSibling.elements.length > 4
          ? "200px"
          : `${currentCategoryRef.nextElementSibling.elements.length * 50}px`;
    }
  }, [currentCategoryRef]);

  const scrollToCube = useCallback(
    isCurrentCubeCategory => {
      closeCategoryCubeList();
      openCategoryCubeList();
      let foundCubeRef;
      switch (true) {
        case (currentPath[0] === "dashboard" || currentPath[0] === "show") &&
          !isCurrentCubeCategory:
          currCategoryCubeRefs[0].ref.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case (currentPath[0] === "edit" || currentPath[0] === "show") &&
          isCurrentCubeCategory:
          foundCubeRef = currCategoryCubeRefs.find(
            cube => cube.ref.value === currentCubeId
          );
          foundCubeRef && (foundCubeRef.ref.checked = true);
          break;
        case currentPath[0] === "edit" || currentPath[0] === "new":
          const indexOfNewestCubeRef = currCategoryCubeRefs.length - 1;
          foundCubeRef = currCategoryCubeRefs[indexOfNewestCubeRef];
          break;
        default:
          break;
      }
      foundCubeRef?.ref.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [
      currentCubeId,
      currCategoryCubeRefs,
      currentPath,
      closeCategoryCubeList,
      openCategoryCubeList,
    ]
  );

  const categoryWasShuffledEvents = useCallback(() => {
    setCurrCategoryCubeRefs(
      cubeRefs.find(cubeRefArr => cubeRefArr[0].category_id === currentCategory)
    );
    scrollToCube(true);
    history.push(`/dashboard/${currentCubeId}`);
    setCategoryWasShuffled(false);
  }, [cubeRefs, currentCategory, currentCubeId, history, scrollToCube]);

  //====================================================================================//

  useEffect(() => {
    console.log("USE EFFECT RAN");
    currentCategory ?? closeCategoryCubeList();
    findCurrentPath();
    if (cubeRefs.length !== 0 && categoryRefs.length !== 0) {
      currentCategory &&
        currentCategory !== currentCategoryRef?.id &&
        findCurrentCategoryInfo();
      categoryWasShuffled && categoryWasShuffledEvents();
      // Gathering needed cube and category info differently depending on the path
      switch (currentPath[0]) {
        case "edit":
        case "show":
          if (currentCubeId) {
            const currentCubeCat = currentUserInfo?.categories.find(category =>
              category.cubes.includes(currentCubeId)
            );
            currentCubeCat._id !== currentCubeCategory &&
              findCurrentCubeCategory(currentCubeCat._id);
          } else {
            findCurrentCubeId();
          }
          if (
            currentCategory &&
            currentCategoryRef &&
            currCategoryCubeRefs?.length !== 0
          ) {
            currentCategory === currentCubeCategory
              ? scrollToCube(true)
              : scrollToCube(false);
          }
          break;
        case "dashboard":
        case "new":
          resetCubeId();
          if (
            currentCategory &&
            currentCategoryRef &&
            currCategoryCubeRefs?.length !== 0
          ) {
            currCategoryCubeRefs.forEach(cube => (cube.ref.checked = false));
            scrollToCube(false);
          }
          break;
        default:
          break;
      }
    }
  }, [
    currentUserInfo,
    pathname,
    findCurrentPath,
    cubeRefs.length,
    categoryRefs.length,
    currentCategory,
    currentCategoryRef,
    currentCubeId,
    currentCubeCategory,
    currentPath,
    closeCategoryCubeList,
    openCategoryCubeList,
    findCurrentCategoryInfo,
    findCurrentCubeCategory,
    findCurrentCubeId,
    resetCubeId,
    currCategoryCubeRefs,
    scrollToCube,
    categoryWasShuffled,
    categoryWasShuffledEvents,
  ]);

  //====================================================================================//

  const handleCategoryClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      target: { nextElementSibling: categoryCubeList },
    } = e;
    if (categoryCubeList.style.maxHeight === "0px") {
      // if opening a new category
      setCurrentCategory(e.target.id);
    } else {
      // if closing current category, close targeted category and go to dashboard.
      currCategoryCubeRefs.forEach(cube => (cube.ref.checked = false));
      categoryCubeList.style.maxHeight = "0px";
      e.target.classList.remove("active");
      setCurrentCategory(null);
      setCurrentCategoryRef(null);
      setCurrCategoryCubeRefs([]);
      history.push(`/dashboard`);
    }
  };

  const handleCubeClick = e => {
    setCurrentCubeId(e.target.value);
    history.push(`/dashboard/${e.target.value}`);
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const changeCubeListOpacity = () => {
    currentCategoryRef.nextElementSibling.style.opacity = "0";
    setTimeout(() => {
      currentCategoryRef.nextElementSibling.style.opacity = "1";
    }, 1000);
  };

  //====================================================================================//

  return (
    <>
      <div className="cube-list-grp container-column">
        {isLoading && (
          <div className="loading-group">
            <PackageIcon size={24} className="loading-icon" />
            <h3>Loading Category and Cube Lists</h3>
          </div>
        )}
        {!isLoading && (
          <>
            <fieldset>
              <legend hidden>Choose a Category</legend>
              {currentUserInfo?.categories?.map(
                (
                  {
                    cubes: categoryCubes,
                    _id: categoryId,
                    title: categoryTitle,
                    cubes: { length: cubeListLength },
                  },
                  i
                ) => (
                  <div className="cube-list theme-transition" key={categoryId}>
                    <div className="category-container">
                      {currentCategory === categoryId ? (
                        <div className="category-btn-cover theme-transition">
                          <span className="category-title">{`${categoryTitle}`}</span>
                          <div className="category-options-grp container-row pointer-disabled">
                            <CubeCount
                              categoryCubeLength={cubeListLength}
                              cubeListOpened={true}
                            />
                            <span className="container-row pointer-auto">
                              {currentCubeId &&
                                currentPath[0] === "show" &&
                                currentCubeCategory === currentCategory &&
                                currCategoryCubeRefs.length > 1 && (
                                  <CategoryShuffle
                                    setCategoryWasShuffled={
                                      setCategoryWasShuffled
                                    }
                                    changeCubeListOpacity={
                                      changeCubeListOpacity
                                    }
                                  />
                                )}
                              <DeleteBtn
                                categoryId={categoryId}
                                categoryTitle={categoryTitle}
                              />
                            </span>
                            <ChevronDownIcon
                              size={16}
                              className="pointer-disabled"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="category-btn-cover theme-transition">
                          <span className="category-title">{`${categoryTitle}`}</span>
                          <div className="category-options-grp container-row pointer-disabled">
                            <CubeCount
                              categoryCubeLength={cubeListLength}
                              cubeListOpened={false}
                            />
                            <ChevronRightIcon
                              size={16}
                              className="pointer-disabled"
                            />
                          </div>
                        </div>
                      )}
                      <button
                        tabIndex="0"
                        onClick={handleCategoryClick}
                        type="button"
                        className="category-btn theme-transition"
                        value={categoryTitle}
                        title={categoryTitle}
                        id={categoryId}
                        ref={element => {
                          if (element) {
                            cubeRefs[i] = [];
                            categoryRefs[i] = element;
                          }
                        }}></button>

                      <fieldset
                        style={{
                          overflow: "auto",
                          maxHeight: "0px",
                          transition: `all 0.${
                            categoryCubes.length >= 4 ? 4 : categoryCubes.length
                          }s ease-out 0s`,
                          position: "relative",
                        }}
                        className="content container-column cube-select-group">
                        <legend hidden>Choose a Cube</legend>
                        <ul>
                          {categoryCubes?.map((cube, j) => (
                            <li key={cube} className="radio-button">
                              <input
                                tabIndex="0"
                                type="radio"
                                name="cube-select"
                                value={cube}
                                id={cube}
                                category={categoryId}
                                onClick={handleCubeClick}
                                ref={element => {
                                  if (element) {
                                    cubeRefs[i][j] = {
                                      category_id: categoryId,
                                      ref: element,
                                    };
                                  }
                                }}
                              />
                              <label className="radio-label" htmlFor={cube}>
                                {questionsAreVisible
                                  ? currentUserInfo?.cubes.find(
                                      item => item._id === cube
                                    ).question.length > 60
                                    ? currentUserInfo?.cubes
                                        .find(item => item._id === cube)
                                        .question.slice(0, 60) + " . . ."
                                    : currentUserInfo?.cubes.find(
                                        item => item._id === cube
                                      ).question
                                  : `Cube ${j + 1}`}
                              </label>
                              {currentCubeId === cube && (
                                <CubeCtrls cubeId={cube} />
                              )}
                            </li>
                          ))}
                        </ul>
                        {((currentPath[0] === "edit" &&
                          categoryId !== currentCubeCategory) ||
                          currentPath[0] === "new") && (
                          <PlaceHolderCube
                            currentPath={currentPath}
                            currentCubeCategory={currentCubeCategory}
                          />
                        )}
                      </fieldset>
                    </div>
                  </div>
                )
              )}
            </fieldset>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(CubeList);
