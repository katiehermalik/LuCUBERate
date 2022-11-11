import { createContext, useState, useEffect } from "react";
import UserModel from "../models/user";

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);
export const CategoryListContext = createContext(null);
export const NewUserContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const { user_Id, isLoggedIn } =
      JSON.parse(localStorage.getItem("user")) || {};
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
      <NewUserContext.Provider value={{ newUser, setNewUser }}>
        <UserContext.Provider
          value={{ currentUserInfo, setCurrentUserInfo, isLoading }}>
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
        </UserContext.Provider>
      </NewUserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
