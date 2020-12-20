import React from 'react'
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UnAuthRoutes from './config/UnAuthRoutes';
import './App.css';


class App extends React.Component {
  state = {}

  auth = (data) => {
    this.setState(data)
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState(foundUser)
    }
  }

  render() {
    return (
      <div className="app container-column">
        <Navbar 
          auth={this.auth} 
          user={this.state.currentUser}/>
        <UnAuthRoutes />
        { this.state.currentUser && window.location.pathname !== '/' &&
        <Dashboard user={this.state.currentUser} />
        }
      </div>
    );
  }
}

export default App ;
