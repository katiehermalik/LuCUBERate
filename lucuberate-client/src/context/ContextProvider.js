import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useLocation } from "react-router-dom";
import OauthAPI from "../utils/api/oauth";
import CubeAPI from "../utils/api/cube";

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);
export const CategoryListContext = createContext(null);
export const GuideContext = createContext(null);
export const DeleteModalContext = createContext(null);
export const CurrentPathContext = createContext(null);

const ContextProvider = ({ children }) => {
  const { isLoggedIn } = JSON.parse(sessionStorage.getItem("user")) || "";
  const { pathname } = useLocation();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [userDataUpdating, setUserDataUpdating] = useState(true);
  const [currentPath, setCurrentPath] = useReducer(currentPathReducer, [""]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [cubeData, setCubeData] = useState({});
  const [currentCubeId, setCurrentCubeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});

  function currentPathReducer(prevState, { type, cleanedPathname }) {
    switch (type) {
      case "home":
        return prevState[0] !== type ? [type, null] : prevState;
      case "edit":
        const editCubeId = cleanedPathname.split("/")[2];
        const cubeToBeEdited = currentUserInfo.cubes.find(
          cube => cube._id === editCubeId
        );
        if (cubeToBeEdited) {
          return !prevState ||
            prevState[1] !== editCubeId ||
            prevState[0] !== type
            ? [type, editCubeId]
            : prevState;
        } else {
          return !prevState || prevState[0] !== "404"
            ? ["404", null]
            : prevState;
        }
      case "new":
      case "dashboard":
        return prevState[0] !== type ? [type, null] : prevState;
      default:
        // For default value: type = :id
        const showCubeId = cleanedPathname.match(/\b[\w]+$/g)[0];
        let foundCube;
        foundCube = currentUserInfo.cubes.find(cube => cube._id === showCubeId);
        if (foundCube) {
          return !prevState ||
            prevState[1] !== showCubeId ||
            prevState[0] !== "show"
            ? ["show", showCubeId]
            : prevState;
        } else {
          return !prevState || prevState[0] !== "404"
            ? ["404", null]
            : prevState;
        }
    }
  }

  const findCurrentPath = useCallback(
    cleanedPathname => {
      isLoggedIn && pathname !== "/"
        ? setCurrentPath({
            type: cleanedPathname.match(/\b[\w]+$/g)[0],
            cleanedPathname,
          })
        : setCurrentPath({
            type: "home",
            cleanedPathname: null,
          });
    },
    [pathname, isLoggedIn]
  );

  const cleanPathname = useCallback(() => {
    const cleanedPathname = (() => {
      if (pathname[pathname.length - 1] === "/") {
        return pathname.slice(0, -1);
      } else {
        return pathname;
      }
    })();
    findCurrentPath(cleanedPathname);
  }, [pathname, findCurrentPath]);

  const findUserInfo = useCallback(async () => {
    if (userDataUpdating) {
      const userData = await OauthAPI.oauthUserData();
      // const userData = await UserAPI.allCubesAndCategories(user_Id);
      setCurrentUserInfo(userData);
      setTheme(userData.theme);
      setUserDataUpdating(false);
      setShowGuide(userData.showGuideModal);
    }
  }, [userDataUpdating]);

  const loadCube = useCallback(async () => {
    if (currentPath[0] === "show" || currentPath[0] === "edit") {
      const cube = await CubeAPI.getOne(currentPath[1]);
      setCubeData(cube);
    } else {
      setCubeData({});
    }
  }, [currentPath]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!currentUserInfo || userDataUpdating === true) {
        setIsLoading(true);
        findUserInfo();
      }
    } else {
      findCurrentPath();
    }
  }, [
    userDataUpdating,
    currentUserInfo,
    isLoggedIn,
    findUserInfo,
    findCurrentPath,
  ]);

  useEffect(() => {
    if (currentUserInfo && userDataUpdating === false) {
      cleanPathname();
    }
    setIsLoading(false);
  }, [pathname, currentUserInfo, userDataUpdating, cleanPathname]);

  useEffect(() => {
    loadCube();
  }, [currentPath, loadCube]);

  return (
    <>
      <CurrentPathContext.Provider
        value={{ currentPath, cubeData, setCubeData }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <UserContext.Provider
            value={{
              currentUserInfo,
              setCurrentUserInfo,
              setUserDataUpdating,
              isLoading,
              isLoggedIn,
            }}>
            <DeleteModalContext.Provider
              value={{ deleteModalInfo, setDeleteModalInfo }}>
              <GuideContext.Provider value={{ showGuide, setShowGuide }}>
                <CategoryListContext.Provider
                  value={{ showCategoryList, setShowCategoryList }}>
                  <CategoryContext.Provider
                    value={{ currentCategory, setCurrentCategory }}>
                    <CubeContext.Provider
                      value={{ currentCubeId, setCurrentCubeId }}>
                      <QuestionsContext.Provider
                        value={{
                          questionsAreVisible,
                          setQuestionsAreVisible,
                        }}>
                        {children}
                      </QuestionsContext.Provider>
                    </CubeContext.Provider>
                  </CategoryContext.Provider>
                </CategoryListContext.Provider>
              </GuideContext.Provider>
            </DeleteModalContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </CurrentPathContext.Provider>
    </>
  );
};

export default ContextProvider;
