import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserAPI from "../utils/api/user";
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
  const navigate = useNavigate();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [userDataUpdating, setUserDataUpdating] = useState(true);
  const [currentPath, setCurrentPath] = useReducer(currentPathReducer, [""]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [cubeData, setCubeData] = useState({});
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});
  const params = pathname.split("/");
  const currentPage = params[2];
  const cubeId = params[3];

  function currentPathReducer(prevState, { type, cubeId }) {
    switch (type) {
      case "instructions":
      case "new":
        return prevState[0] !== type ? [type, null] : prevState;
      case "edit":
      case "cube":
        const foundCube = currentUserInfo.cubes.find(
          cube => cube._id === cubeId
        );
        if (foundCube) {
          return !prevState || prevState[1] !== cubeId || prevState[0] !== type
            ? [type, cubeId]
            : prevState;
        } else {
          return !prevState || prevState[0] !== "404"
            ? ["404", null]
            : prevState;
        }
      default:
        return !prevState || prevState[0] !== "404" ? ["404", null] : prevState;
    }
  }

  const findUserInfo = useCallback(async () => {
    if (userDataUpdating) {
      const userInfo = await UserAPI.userData();
      const { userData } = userInfo;
      setCurrentUserInfo(userData);
      setTheme(userData.theme);
      setUserDataUpdating(false);
      setShowGuide(userData.showGuideModal);
    }
  }, [userDataUpdating]);

  const loadCube = useCallback(async () => {
    if (currentPath[0] === "cube" || currentPath[0] === "edit") {
      const cube = await CubeAPI.getOne(currentPath[1]);
      setCubeData(cube);
    } else {
      setCubeData({});
    }
  }, [currentPath]);

  // ------------------------------ Use Effects ----------------------------------- //

  useEffect(() => {
    // Remove multiple slashes from url
    if (pathname.match(/\/+/gm)) {
      let url = pathname;
      url = url.replace(/\/+/gm, "/");
      navigate(url);
    }
    if (isLoggedIn) {
      if (!currentUserInfo || userDataUpdating === true) {
        setIsLoading(true);
        findUserInfo();
      }
    } else {
      setCurrentPath({
        type: currentPage,
        cubeId,
      });
    }
  }, [
    navigate,
    pathname,
    cubeId,
    currentPage,
    userDataUpdating,
    currentUserInfo,
    isLoggedIn,
    findUserInfo,
  ]);

  useEffect(() => {
    if (currentUserInfo && userDataUpdating === false) {
      setCurrentPath({
        type: currentPage,
        cubeId,
      });
    }
  }, [pathname, cubeId, currentPage, currentUserInfo, userDataUpdating]);

  useEffect(() => {
    loadCube();
  }, [currentPath, loadCube]);

  useEffect(() => {
    setIsLoading(false);
  }, [cubeData]);

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
                  value={{ showSidePanel, setShowSidePanel }}>
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
