import { createContext, useState, useEffect } from "react";
import UserModel from "../models/user";

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);
export const CategoryListContext = createContext(null);
export const GuideContext = createContext(null);
export const DeleteModalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const { user_Id, isLoggedIn } =
    JSON.parse(sessionStorage.getItem("user")) || "";

  useEffect(() => {
    if (isLoggedIn && isLoading) {
      (async () => {
        const userData = await UserModel.allCubesAndCategories(user_Id);
        setCurrentUserInfo(userData);
        setTheme(userData.theme);
      })();
      if (currentUserInfo && theme) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [isLoading, currentUserInfo, theme, isLoggedIn, user_Id]);

  return (
    <>
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
                      value={{ questionsAreVisible, setQuestionsAreVisible }}>
                      {children}
                    </QuestionsContext.Provider>
                  </CubeContext.Provider>
                </CategoryContext.Provider>
              </CategoryListContext.Provider>
            </GuideContext.Provider>
          </DeleteModalContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default ContextProvider;
