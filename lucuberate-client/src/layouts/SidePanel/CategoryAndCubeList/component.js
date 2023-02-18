import {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { PackageIcon } from "@primer/octicons-react";
import {
  UserContext,
  CurrentPathContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
} from "../../../context/ContextProvider";
import PlaceholderCube from "./CubeCtrls/PlaceholderCube";
import CubeCtrls from "./CubeCtrls/component";
import CategoryCtrls from "./CategoryCtrls/component";
import Footer from "../../SidePanelFooter";
import "./style.css";

const CategoryAndCubeList = () => {
  const navigate = useNavigate();
  const { currentUserInfo, isLoading } = useContext(UserContext);
  const { currentPath } = useContext(CurrentPathContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId, setCurrentCubeId } = useContext(CubeContext);
  const { questionsAreVisible } = useContext(QuestionsContext);

  const currentCubeRefs = useRef([]);
  const currentCategoryRefs = useRef([]);
  const { current: cubeRefs } = currentCubeRefs || [];
  const { current: categoryRefs } = currentCategoryRefs || [];

  const [currentCategoryRef, setCurrentCategoryRef] = useState(null);
  const [currCategoryCubeRefs, setCurrCategoryCubeRefs] = useState([]);
  const [currentCubeCategory, setCurrentCubeCategory] = useState("");
  const [categoryWasShuffled, setCategoryWasShuffled] = useState(false);
  const [placeholderRendered, setPlaceholderRendered] = useState(false);

  //====================================================================================//

  const findCurrentCubeId = useCallback(() => {
    setCurrentCubeId(currentPath[1]);
  }, [currentPath, setCurrentCubeId]);

  const resetCubeId = useCallback(() => {
    setCurrentCubeId("");
    setCurrentCubeCategory("");
  }, [setCurrentCubeId]);

  const findCurrentCubeCategoryInfo = useCallback(
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
        ref.parentElement.style.zIndex = "0";
        ref.nextElementSibling.style.maxHeight = "0px";
      });
    } else {
      categoryRefs.forEach(ref => {
        if (
          ref.id !== currentCategoryRef?.id &&
          ref.className.split(" ").includes("active")
        ) {
          ref.classList.remove("active");
          ref.parentElement.style.zIndex = "0";
          ref.nextElementSibling.style.maxHeight = "0px";
        }
      });
    }
  }, [categoryRefs, currentCategoryRef, currentCategory]);

  const findCubeListHeight = useCallback(() => {
    let elementArray = Object.values(
      currentCategoryRef.nextElementSibling.elements
    ).filter(el => el.nodeName === "INPUT");
    if (elementArray.length >= 4) {
      elementArray = elementArray.slice(0, 4);
    }
    const cubeListHeight = elementArray.reduce((accu, curr) => {
      return accu + curr.parentNode.clientHeight;
    }, 0);
    currentCategoryRef.nextElementSibling.style.height = `${cubeListHeight}px`;
    currentCategoryRef.nextElementSibling.style.maxHeight = `${cubeListHeight}px`;
  }, [currentCategoryRef]);

  const openCategoryCubeList = useCallback(() => {
    if (!currentCategoryRef.className.split(" ").includes("active")) {
      currentCategoryRef.classList.add("active");
      currentCategoryRef.parentElement.style.zIndex = "1";
      findCubeListHeight();
    }
  }, [currentCategoryRef, findCubeListHeight]);

  const scrollToCube = useCallback(
    isCurrentCubeCategory => {
      closeCategoryCubeList();
      openCategoryCubeList();
      let foundCubeRef;
      switch (true) {
        case (currentPath[0] === "instructions" || currentPath[0] === "cube") &&
          !isCurrentCubeCategory:
          setTimeout(function () {
            currCategoryCubeRefs[0].ref.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
          break;
        case (currentPath[0] === "edit" || currentPath[0] === "cube") &&
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
      setTimeout(function () {
        foundCubeRef?.ref.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
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
    navigate(`/dashboard/cube/${currentCubeId}`);
    setCategoryWasShuffled(false);
  }, [cubeRefs, currentCategory, currentCubeId, navigate, scrollToCube]);

  //====================================================================================//

  useEffect(() => {
    currentCategory ?? closeCategoryCubeList();
    if (cubeRefs.length !== 0 && categoryRefs.length !== 0) {
      currentCategory &&
        currentCategory !== currentCategoryRef?.id &&
        findCurrentCategoryInfo();
      categoryWasShuffled && categoryWasShuffledEvents();
      // Gathering needed cube and category info differently depending on the path
      switch (currentPath[0]) {
        case "edit":
        case "cube":
          if (currentCubeId) {
            const { _id: currentCubeCatId } = currentUserInfo.categories.find(
              category => category.cubes.includes(currentCubeId)
            );
            currentCubeCatId !== currentCubeCategory &&
              findCurrentCubeCategoryInfo(currentCubeCatId);
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
        case "instructions":
        case "new":
        case "404":
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
    cubeRefs.length,
    categoryRefs.length,
    currentCategory,
    currentCategoryRef,
    currentCubeId,
    currentCubeCategory,
    currentPath,
    closeCategoryCubeList,
    findCurrentCategoryInfo,
    findCurrentCubeCategoryInfo,
    findCurrentCubeId,
    resetCubeId,
    currCategoryCubeRefs,
    scrollToCube,
    categoryWasShuffled,
    categoryWasShuffledEvents,
  ]);

  useLayoutEffect(() => {
    currentCategoryRef && findCubeListHeight();
  }, [
    currentUserInfo,
    findCubeListHeight,
    placeholderRendered,
    questionsAreVisible,
    currentCategoryRef,
  ]);

  //====================================================================================//

  const handleCategoryClick = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      target: { nextElementSibling: categoryCubeList },
      target: { parentElement: categoryContainer },
    } = e;
    if (categoryCubeList.style.maxHeight === "0px") {
      // if opening a new category
      categoryContainer.style.zIndex = "1";
      setCurrentCategory(e.target.id);
    } else {
      // if closing current category, close targeted category and go to dashboard.
      categoryContainer.style.zIndex = "0";
      currCategoryCubeRefs.forEach(cube => (cube.ref.checked = false));
      categoryCubeList.style.maxHeight = "0px";
      e.target.classList.remove("active");
      setCurrentCategory(null);
      setCurrentCategoryRef(null);
      setCurrCategoryCubeRefs([]);
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
        <>
          <div id={"cube-list-grp"} className="cube-list-grp container-column">
            {isLoading && (
              <div className="loading-group">
                <PackageIcon size={24} className="loading-icon" />
                <h3>Loading Category and Cube Lists</h3>
              </div>
            )}
            {!isLoading && (
              <>
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
                      <div
                        className="cube-list theme-transition"
                        key={categoryId}>
                        <div className="category-container">
                          <CategoryCtrls
                            setCategoryWasShuffled={setCategoryWasShuffled}
                            currentCubeCategory={currentCubeCategory}
                            cubeRefsLength={currCategoryCubeRefs.length}
                            currentCategoryRef={currentCategoryRef}
                            cubeListLength={cubeListLength}
                            categoryTitle={categoryTitle}
                            categoryId={categoryId}
                          />
                          <button
                            tabIndex="0"
                            onClick={handleCategoryClick}
                            type="button"
                            className="category-item category-btn theme-transition"
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
                            className="content container-column cube-select-group"
                            style={{
                              maxHeight: "0px",
                              transition: `all 0.${
                                categoryCubes.length >= 4
                                  ? 4
                                  : categoryCubes.length
                              }s ease-out 0s`,
                            }}>
                            <legend
                              hidden>{`Cube list for ${categoryTitle} category: Choose a Cube`}</legend>
                            <ul>
                              {categoryCubes?.map((cube, j) => (
                                <div key={cube}>
                                  <li className="radio-button">
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
                                    <label
                                      className="radio-label"
                                      htmlFor={cube}>
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
                                  </li>
                                </div>
                              ))}
                              <PlaceholderCube
                                placeholderRendered={placeholderRendered}
                                setPlaceholderRendered={setPlaceholderRendered}
                                currentPath={currentPath}
                                currentCubeCategory={currentCubeCategory}
                              />
                            </ul>
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
      )}
    </>
  );
};

export default CategoryAndCubeList;
