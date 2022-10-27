import { createContext, useState, useEffect } from 'react';
import UserModel from '../models/user';

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);
export const ThemeContext = createContext(null);


const ContextProvider = ({ children }) => {
  const [ currentUserInfo, setCurrentUserInfo ] = useState({});
  const [ currentCategory, setCurrentCategory ] = useState('');
  const [ currentCubeId, setCurrentCubeId ] = useState('');
  const [ questionsAreVisible, setQuestionsAreVisible ] = useState(false);
  const [ darkMode, setDarkMode ] = useState(true);
  

  useEffect(() => {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id;
      UserModel.allCubesAndCategories(user_id)
      .then((categoriesAndCubes) => {
        setCurrentUserInfo({...categoriesAndCubes, user_id: user_id });
      }); 
    }
  },[])
  
  return  <ThemeContext.Provider value={ {darkMode, setDarkMode} }> 
    <UserContext.Provider value={ {currentUserInfo, setCurrentUserInfo} }> 
      <CategoryContext.Provider value={ {currentCategory, setCurrentCategory} }> 
        <CubeContext.Provider value={ {currentCubeId, setCurrentCubeId} }> 
          <QuestionsContext.Provider value={ {questionsAreVisible, setQuestionsAreVisible} }> 
            { children }
          </QuestionsContext.Provider>
        </CubeContext.Provider>
      </CategoryContext.Provider>
    </UserContext.Provider>
  </ThemeContext.Provider>
}


export default ContextProvider;