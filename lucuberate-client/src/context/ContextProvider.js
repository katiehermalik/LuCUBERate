import { createContext, useState, useEffect } from "react";
import UserModel from "../models/user";

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);
export const CategoryListContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCubeId, setCurrentCubeId] = useState("");
  const [questionsAreVisible, setQuestionsAreVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showCategoryList, setShowCategoryList] = useState(true);

  useEffect(() => {
    console.log(currentUserInfo);
    console.log(isLoading);
    console.log(Boolean(window.localStorage.user));
    const { user_Id, isLoggedIn } =
      JSON.parse(localStorage.getItem("user")) || {};
    if (isLoggedIn && isLoading) {
      console.log("this happens");
      UserModel.allCubesAndCategories(user_Id).then(userData => {
        console.log(userData);
        setCurrentUserInfo(userData);
      });

      // const user = JSON.parse(localStorage.getItem("user"));
      // setCurrentUserInfo(user.currentUser);
      setIsLoading(false);
    }
    // currentUserInfo && setIsLoading(false);
  }, [isLoading, currentUserInfo]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
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
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
