import { createContext, useState, useEffect } from 'react';
import UserModel from '../models/user';

export const UserContext = createContext(null);
export const CategoryContext = createContext(null);
export const CubeContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [ userContent, setUserContent ] = useState({});
  const [ currentCategory, setCurrentCategory ] = useState('');
  const [ currentCubeId, setCurrentCubeId ] = useState('');
  

  useEffect(() => {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id;
      UserModel.allCubesAndCategories(user_id)
      .then((categoriesWithCubes) => {
        setUserContent({...categoriesWithCubes, user_id: user_id });
      }); 
    }
  },[])
  
  return <UserContext.Provider value={ {userContent, setUserContent} }> 
      <CategoryContext.Provider value={ {currentCategory, setCurrentCategory} }> 
        <CubeContext.Provider value={ {currentCubeId, setCurrentCubeId} }> 
      { children }
        </CubeContext.Provider>
      </CategoryContext.Provider>
    </UserContext.Provider>
}


export default ContextProvider;