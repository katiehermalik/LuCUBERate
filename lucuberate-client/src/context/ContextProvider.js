import { createContext, useState, useEffect } from 'react';
import UserModel from '../models/user';

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);
export const QuestionsContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [ userContent, setUserContent ] = useState({});
  const [ currentCategory, setCurrentCategory ] = useState('');
  const [ currentCubeId, setCurrentCubeId ] = useState('');
  const [ questionsAreVisible, setQuestionsAreVisible ] = useState(false);
  

  useEffect(() => {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id;
      UserModel.allCubesAndCategories(user_id)
      .then((categoriesAndCubes) => {
        setUserContent({...categoriesAndCubes, user_id: user_id });
      }); 
    }
  },[])
  
  return <UserContext.Provider value={ {userContent, setUserContent} }> 
      <CategoryContext.Provider value={ {currentCategory, setCurrentCategory} }> 
        <CubeContext.Provider value={ {currentCubeId, setCurrentCubeId} }> 
          <QuestionsContext.Provider value={ {questionsAreVisible, setQuestionsAreVisible} }> 
            { children }
          </QuestionsContext.Provider>
        </CubeContext.Provider>
      </CategoryContext.Provider>
    </UserContext.Provider>
}


export default ContextProvider;