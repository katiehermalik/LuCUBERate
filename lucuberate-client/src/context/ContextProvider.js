import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useLocation } from "react-router-dom";
import UserModel from "../models/user";
import CubeModel from "../models/cube";

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
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});
  const { user_Id, isLoggedIn } =
    JSON.parse(sessionStorage.getItem("user")) || "";
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useReducer(currentPathReducer, [""]);
  const [cubeData, setCubeData] = useState({});

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
    let cleanedPathname;
    pathname[pathname.length - 1] === "/"
      ? (cleanedPathname = pathname.slice(0, -1))
      : (cleanedPathname = pathname);
    findCurrentPath(cleanedPathname);
  }, [pathname, findCurrentPath]);

  const findUserInfo = useCallback(async () => {
    const userData = await UserModel.allCubesAndCategories(user_Id);
    setCurrentUserInfo(userData);
    setTheme(userData.theme);
  }, [user_Id]);

  const findCubeData = useCallback(async () => {
    if (currentPath[0] === "show" || currentPath[0] === "edit") {
      const cube = await CubeModel.getOne(currentPath[1]);
      setCubeData(cube);
    } else setCubeData({});
  }, [currentPath]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      !currentUserInfo && findUserInfo();
      currentUserInfo && cleanPathname();
      currentPath[0] && findCubeData();
      currentUserInfo && currentPath[0] && setIsLoading(false);
    } else {
      findCurrentPath();
    }
  }, [
    currentUserInfo,
    cleanPathname,
    currentPath,
    findUserInfo,
    isLoggedIn,
    pathname,
    findCubeData,
    findCurrentPath,
  ]);

  return (
    <>
      <CurrentPathContext.Provider value={{ currentPath, cubeData }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <UserContext.Provider
            value={{
              currentUserInfo,
              setCurrentUserInfo,
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
