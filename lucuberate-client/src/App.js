import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UnAuthRoutes from './config/UnAuthRoutes';
import './App.css';

const App = () => {
  const [ data , setData ] = useState(null);
  const [ currentUser , setCurrentUser ] = useState(null);
  // console.log('currentUser', currentUser);

  const auth = (data) => {
    setData(data);
    // console.log('data------>', data);
  }
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  },[])

    return (
      <div className="app container-column">
        <Navbar 
          auth={auth} 
          user={currentUser}/>
        <UnAuthRoutes />
        {window.location.pathname !== '/' &&
        <Dashboard user={currentUser} />
        } 
      </div>
    );
}

export default withRouter(App);
