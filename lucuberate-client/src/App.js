import routes from './config/routes';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      { routes }
    </div>
  );
}

export default App;
