import React from 'react'
import routes from './config/routes';
import Navbar from './components/Navbar';
import CubeListNav from './components/CubeListNav'
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
      <div className="App">
        <Navbar auth={this.auth} user={this.state.currentUser}/>
        <CubeListNav />
        { routes }
      </div>
    );
  }
}

export default App ;
