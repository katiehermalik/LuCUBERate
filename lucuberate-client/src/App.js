import React from 'react'
import routes from './config/routes';
import Navbar from './components/Navbar';
import './App.css';

class App extends React.Component {
  state = {}

  login = (data) => {
    this.setState(data)
  }
  
  logout = (data) => {
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
        <Navbar login={this.login} logout={this.logout} user={this.state.currentUser}/>
        { routes }
      </div>
    );
  }
}

export default App ;
