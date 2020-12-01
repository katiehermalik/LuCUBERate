import React from 'react'
import AllRoutes from './config/routes';
import Navbar from './components/Navbar';
import CubeListNav from './components/CubeListNav'
import Landing from './pages/Landing'
import './App.css';


class App extends React.Component {
  state = {}

  auth = (data) => {
    this.setState(data)
  }

  componentDidMount() {
    console.log(localStorage)
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      this.setState(foundUser)
    }
  }

  render() {
    return (
      <div id="App">
        <Navbar 
          id="NavBar" 
          auth={this.auth} 
          user={this.state.currentUser}/>
        <Landing />
        { this.state.currentUser &&
        <CubeListNav />
        }
        <AllRoutes user={this.state.currentUser} />
      </div>
    );
  }
}

export default App ;
