import { createContext, useState, useEffect } from "react";
import UserModel from "../models/user";

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);
export const CategoryListContext = createContext(null);
export const GuideContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const { user_Id, isLoggedIn } =
      JSON.parse(sessionStorage.getItem("user")) || {};
    if (isLoggedIn && isLoading) {
      UserModel.allCubesAndCategories(user_Id).then(userData => {
        setCurrentUserInfo(userData);
        setTheme(userData.theme);
      });
      setIsLoading(false);
    }
  }, [isLoading, currentUserInfo]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider
        value={{ currentUserInfo, setCurrentUserInfo, isLoading }}>
        <GuideContext.Provider value={{ showGuide, setShowGuide }}>
          <CategoryListContext.Provider
            value={{ showCategoryList, setShowCategoryList }}>
            <CategoryContext.Provider
              value={{ currentCategory, setCurrentCategory }}>
              <CubeContext.Provider value={{ currentCubeId, setCurrentCubeId }}>
                <QuestionsContext.Provider
                  value={{ questionsAreVisible, setQuestionsAreVisible }}>
                  {children}
                </QuestionsContext.Provider>
              </CubeContext.Provider>
            </CategoryContext.Provider>
          </CategoryListContext.Provider>
        </GuideContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
