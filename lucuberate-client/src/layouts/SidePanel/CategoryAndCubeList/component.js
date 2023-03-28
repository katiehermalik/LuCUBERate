import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CurrentPathContext,
  UserContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
} from "../../../context/ContextProvider";
import PlaceholderCube from "./CubeCtrls/PlaceholderCube";
import CubeCtrls from "./CubeCtrls";
import CategoryCtrls from "./CategoryCtrls";
import SidePanelFooter from "../../SidePanelFooter";
import {
  findCubeListHeight,
  openCategory,
  closeCategories,
  MAX_NUM_OF_CUBES_SHOWN,
} from "./utils";
import "./style.css";

const CategoryAndCubeList = () => {
  const navigate = useNavigate();
  const { currentPath } = useContext(CurrentPathContext);
  const { currentUserInfo } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const { questionsAreVisible } = useContext(QuestionsContext);

  const currentCubeRefs = useRef([]);
  const currentCategoryRefs = useRef([]);
  const { current: allCubeRefs } = currentCubeRefs || [];
  const { current: allCategoryRefs } = currentCategoryRefs || [];

  const [currCatRef, setCurrCatRef] = useState(null);
  const [currCatCubeRefs, setCurrCatCubeRefs] = useState([]);
  // currCubeCat could be different from currCatRef.id in the case of
  // editing the cube and switching the cube's category
  const [currCubeCat, setCurrCubeCat] = useState("");

  const [categoryWasShuffled, setCategoryWasShuffled] = useState(false);
  const [placeholderRendered, setPlaceholderRendered] = useState(false);

  //=========================================== finding Cube and Category info =======//

  const findCurrentCubeId = useCallback(() => {
    setCurrentCubeId(currentPath[1]);
  }, [currentPath, setCurrentCubeId]);

  const resetCubeId = useCallback(() => {
    setCurrentCubeId("");
    setCurrCubeCat("");
  }, [setCurrentCubeId]);

  const findCurrCubeCatInfo = useCallback(
    currentCubeCatId => {
      setCurrCubeCat(prevState =>
        prevState !== currentCubeCatId ? currentCubeCatId : prevState
      );
      setCurrentCategory(prevState =>
        prevState !== currentCubeCatId ? currentCubeCatId : prevState
      );
      setCurrCatRef(allCategoryRefs.find(ref => ref.id === currentCubeCatId));
    },
    [setCurrentCategory, allCategoryRefs]
  );

  const findCurrCatInfo = useCallback(() => {
    const foundCubeRefsArr = allCubeRefs.find(
      cubeRefArr => cubeRefArr[0].category_id === currentCategory
    );
    setCurrCatRef(prevState => {
      const foundCurrCatRef = allCategoryRefs.find(
        ref => ref.id === currentCategory
      );
      return prevState !== foundCurrCatRef ? foundCurrCatRef : prevState;
    });
    setCurrCatCubeRefs(prevState =>
      prevState !== foundCubeRefsArr ? foundCubeRefsArr : prevState
    );
  }, [allCategoryRefs, allCubeRefs, currentCategory]);

  //==================================================== interating with cubes =======//

  const scrollToCube = useCallback(() => {
    let selectedCubeRef;
    switch (true) {
      case placeholderRendered:
        const indexOfNewestCubeRef = currCatCubeRefs.length - 1;
        selectedCubeRef = currCatCubeRefs[indexOfNewestCubeRef];
        break;
      case (!placeholderRendered && currentPath[0] === "edit") ||
        currentPath[0] === "cube":
        selectedCubeRef = currCatCubeRefs.find(
          cube => cube.ref.value === currentCubeId
        );
        selectedCubeRef && (selectedCubeRef.ref.checked = true);
        break;
      default:
        break;
    }
    selectedCubeRef?.ref.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentCubeId, currCatCubeRefs, currentPath, placeholderRendered]);

  const initiateShuffledEvents = useCallback(() => {
    scrollToCube();
    setCategoryWasShuffled(false);
  }, [scrollToCube]);

  //============================================================== useEffects =====//

  useEffect(() => {
    setCurrCatCubeRefs(
      allCubeRefs.find(
        cubeRefArr => cubeRefArr[0].category_id === currentCategory
      )
    );
  }, [currentUserInfo, allCubeRefs, currentCategory]);

  useEffect(() => {
    currentCategory ?? findCurrCatInfo();
    currentCategory && currentCategory !== currCatRef?.id && findCurrCatInfo();
  }, [currentCategory, currCatRef, findCurrCatInfo]);

  useEffect(() => {
    const noCubeSelectedPages = ["instructions", "new", "404"];
    if (currentCategory && currCatRef && currCatCubeRefs?.length) {
      if (noCubeSelectedPages.includes(currentPath[0])) {
        currCatCubeRefs.forEach(cube => (cube.ref.checked = false));
      }
      scrollToCube();
    }
  }, [currentPath, currentCategory, currCatRef, currCatCubeRefs, scrollToCube]);

  useEffect(() => {
    categoryWasShuffled && initiateShuffledEvents();
  }, [categoryWasShuffled, initiateShuffledEvents]);

  useEffect(() => {
    if (allCubeRefs.length) {
      switch (currentPath[0]) {
        case "edit":
        case "cube":
          if (currentCubeId) {
            const { _id: currentCubeCatId } = currentUserInfo.categories.find(
              category => category.cubes.includes(currentCubeId)
            );
            currentCubeCatId !== currCubeCat &&
              findCurrCubeCatInfo(currentCubeCatId);
          } else {
            findCurrentCubeId();
          }
          break;
        case "instructions":
        case "new":
        case "404":
          resetCubeId();
          break;
        default:
          break;
      }
    }
  }, [
    currentUserInfo,
    allCubeRefs,
    currentCubeId,
    currCubeCat,
    currentPath,
    findCurrCubeCatInfo,
    findCurrentCubeId,
    resetCubeId,
  ]);

  useEffect(() => {
    currCatRef && findCubeListHeight(currCatRef);
  }, [currentUserInfo, currCatRef, placeholderRendered, questionsAreVisible]);

  useEffect(() => {
    currCatRef && openCategory(currCatRef);
    closeCategories(currentCategory, currCatRef, allCategoryRefs);
  }, [allCategoryRefs, currentCategory, currentUserInfo, currCatRef]);

  //============================================================== click handlers =======//

  const handleCategoryClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      target: { nextElementSibling: categoryCubeList },
      target: { parentElement: categoryContainer },
    } = e;
    if (categoryCubeList.style.maxHeight === "0px") {
      // if opening a category
      categoryContainer.style.zIndex = "1";
      setCurrentCategory(e.target.id);
    } else {
      // if clicked on current open category ---> close category and go to dashboard.
      categoryContainer.style.zIndex = "0";
      currCatCubeRefs.forEach(cube => (cube.ref.checked = false));
      categoryCubeList.style.maxHeight = "0px";
      e.target.classList.remove("open");
      setCurrentCategory(null);
      setCurrCatRef(null);
      setCurrCatCubeRefs([]);
      navigate(`/dashboard/instructions`);
    }
  };

  const handleCubeClick = async e => {
    setCurrentCubeId(e.target.value);
    navigate(`/dashboard/cube/${e.target.value}`);
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  //====================================================================================//

  return (
    <>
      {currentUserInfo && (
        <div id={"cube-list-grp"} className="cube-list-grp container-column">
          <fieldset>
            <legend hidden>Category list: Choose a Category</legend>
            {currentUserInfo.categories?.map(
              (
                {
                  cubes: categoryCubes,
                  _id: categoryId,
                  title: categoryTitle,
                  cubes: { length: cubeListLength },
                },
                i
              ) => (
                <div className="cube-list" key={categoryId}>
                  <div className="category-container">
                    <CategoryCtrls
                      setCategoryWasShuffled={setCategoryWasShuffled}
                      currCubeCat={currCubeCat}
                      cubeRefsLength={currCatCubeRefs?.length}
                      currCatRef={currCatRef}
                      cubeListLength={cubeListLength}
                      categoryTitle={categoryTitle}
                      categoryId={categoryId}
                    />
                    <button
                      tabIndex="0"
                      onClick={handleCategoryClick}
                      type="button"
                      className="category-item category-btn"
                      value={categoryTitle}
                      title={categoryTitle}
                      id={categoryId}
                      ref={element => {
                        if (element) {
                          allCubeRefs[i] = [];
                          allCategoryRefs[i] = element;
                        }
                      }}></button>
                    <fieldset
                      className="content container-column cube-select-group"
                      style={{
                        maxHeight: "0px",
                        transition: `all 0.${
                          categoryCubes.length >= MAX_NUM_OF_CUBES_SHOWN
                            ? MAX_NUM_OF_CUBES_SHOWN
                            : categoryCubes.length
                        }s ease-out 0s`,
                      }}>
                      <legend
                        hidden>{`Cube list for ${categoryTitle} category: Choose a Cube`}</legend>
                      <ul>
                        {categoryCubes?.map((cube, j) => (
                          <li key={cube}>
                            <div className="radio-button">
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
                                    allCubeRefs[i][j] = {
                                      category_id: categoryId,
                                      ref: element,
                                    };
                                  }
                                }}
                              />
                              <label className="radio-label" htmlFor={cube}>
                                {questionsAreVisible
                                  ? currentUserInfo.cubes.find(
                                      item => item._id === cube
                                    ).question.length > 60
                                    ? currentUserInfo.cubes
                                        .find(item => item._id === cube)
                                        .question.slice(0, 60) + " . . ."
                                    : currentUserInfo.cubes.find(
                                        item => item._id === cube
                                      ).question
                                  : `Cube ${j + 1}`}
                              </label>
                              {currentCubeId === cube && (
                                <CubeCtrls
                                  cubeId={cube}
                                  cubeListLength={cubeListLength}
                                  categoryTitle={categoryTitle}
                                />
                              )}
                            </div>
                          </li>
                        ))}
                        <PlaceholderCube
                          placeholderRendered={placeholderRendered}
                          setPlaceholderRendered={setPlaceholderRendered}
                          currentPath={currentPath}
                          currCubeCat={currCubeCat}
                        />
                      </ul>
                    </fieldset>
                  </div>
                </div>
              )
            )}
          </fieldset>
          <SidePanelFooter />
        </div>
      )}
    </>
  );
};

export default CategoryAndCubeList;
