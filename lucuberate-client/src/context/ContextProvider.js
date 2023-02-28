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

export const CurrentPathContext = createContext(null);
export const ThemeContext = createContext(null);
export const LoadingContext = createContext(null);
export const UserContext = createContext(null);
export const DeleteContext = createContext(null);
export const GuideContext = createContext(null);
export const LayoutContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);

const ContextProvider = ({ children }) => {
  const { isLoggedIn } = JSON.parse(sessionStorage.getItem("user")) || "";
  const { completedGuide } =
    JSON.parse(localStorage.getItem("completedGuide")) || "";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [userInfoIsUpdating, setUserInfoIsUpdating] = useState(true);
  const [currentPath, setCurrentPath] = useReducer(currentPathReducer, null);
  const [theme, setTheme] = useState("dark");
  const [appIsLoading, setAppIsLoading] = useState(false);
  const [cubeIsLoading, setCubeIsLoading] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");
  const [cubeData, setCubeData] = useState({});
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const params = pathname.split("/");
  const currentPage = params[2];
  const cubeId = params[3];
  let cleanedPathname;

  // Remove multiple slashes from url
  if (pathname.match(/\/\/+/gm)) {
    cleanedPathname = pathname.replace(/\/\/+/gm, "/");
    navigate(cleanedPathname);
  }

  function currentPathReducer(prevState, { type, cubeId }) {
    switch (type) {
      case "home":
      case "instructions":
      case "new":
        return !prevState || prevState[0] !== type ? [type, null] : prevState;
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
    const userInfo = await UserAPI.userData();
    const { userData } = userInfo;
    setCurrentUserInfo(userData);
    setTheme(userData.theme);
    setUserInfoIsUpdating(false);
    setDeleteModalInfo(prevState => {
      if (
        prevState.showModal === true &&
        (prevState.type === "cube" || prevState.type === "category")
      ) {
        navigate("/dashboard/instructions");
        return { showModal: false };
      } else return { showModal: false };
    });
    setDeleteLoader(false);
    if (userData.showGuideModal && !completedGuide) setShowGuide(true);
  }, [navigate, completedGuide]);

  const loadCube = useCallback(async () => {
    if (currentPath) {
      if (currentPath[0] === "cube" || currentPath[0] === "edit") {
        const cube = await CubeAPI.getOne(currentPath[1]);
        setCubeData(cube);
      } else {
        setCubeData({});
      }
    }
  }, [currentPath]);

  // ------------------------------ Use Effects ----------------------------------- //

  useEffect(() => {
    if (isLoggedIn) {
      if (userInfoIsUpdating) {
        // This is to grab user info in the case of a browser refresh
        // or user data updated (cubes/categories being added or deleted)
        findUserInfo();
      } else if (!userInfoIsUpdating) {
        if (cleanedPathname === "/") {
          setCurrentPath({
            type: "home",
            cubeId: null,
          });
        } else {
          setCurrentPath({
            type: currentPage,
            cubeId,
          });
        }
        setAppIsLoading(false);
      }
    } else {
      setCurrentPath({
        type: "home",
        cubeId: null,
      });
    }
  }, [
    currentUserInfo,
    userInfoIsUpdating,
    isLoggedIn,
    findUserInfo,
    cleanedPathname,
    cubeId,
    currentPage,
  ]);

  useEffect(() => {
    setCubeIsLoading(true);
    loadCube();
  }, [currentPath, loadCube]);

  useEffect(() => {
    setTimeout(() => {
      setCubeIsLoading(false);
    }, 300);
  }, [cubeData]);

  return (
    <>
      <CurrentPathContext.Provider
        value={{ currentPath, setCurrentPath, cubeData, setCubeData }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <LoadingContext.Provider
            value={{
              setAppIsLoading,
              appIsLoading,
              setCubeIsLoading,
              cubeIsLoading,
            }}>
            <UserContext.Provider
              value={{
                currentUserInfo,
                setCurrentUserInfo,
                setUserInfoIsUpdating,
                userInfoIsUpdating,
                isLoggedIn,
              }}>
              <DeleteContext.Provider
                value={{
                  deleteModalInfo,
                  setDeleteModalInfo,
                  deleteLoader,
                  setDeleteLoader,
                }}>
                <GuideContext.Provider value={{ showGuide, setShowGuide }}>
                  <LayoutContext.Provider
                    value={{ showSidePanel, setShowSidePanel }}>
                    <CategoryContext.Provider
                      value={{ currentCategory, setCurrentCategory }}>
                      <CubeContext.Provider
                        value={{
                          currentCubeId,
                          setCurrentCubeId,
                        }}>
                        <QuestionsContext.Provider
                          value={{
                            questionsAreVisible,
                            setQuestionsAreVisible,
                          }}>
                          {children}
                        </QuestionsContext.Provider>
                      </CubeContext.Provider>
                    </CategoryContext.Provider>
                  </LayoutContext.Provider>
                </GuideContext.Provider>
              </DeleteContext.Provider>
            </UserContext.Provider>
          </LoadingContext.Provider>
        </ThemeContext.Provider>
      </CurrentPathContext.Provider>
    </>
  );
};

export default ContextProvider;
