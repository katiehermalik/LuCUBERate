import { createContext, useState, useEffect } from 'react';
import UserModel from '../models/user';

const CubeContext = createContext(null);

export const CubeProvider = ({ children }) => {
  const [ cubeList, setCubeList ] = useState([]);

  useEffect(() => {
    if (window.localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_Id;
      UserModel.allCubes(user_id)
      .then((cubes) => {
        setCubeList(cubes);
      }); 
    }
  },[])


  return (
    <CubeContext.Provider value={ {cubeList, setCubeList} }> 
      { children }
    </CubeContext.Provider>
  )
}


export default CubeContext;