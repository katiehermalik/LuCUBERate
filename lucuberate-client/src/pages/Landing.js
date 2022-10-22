import LandingBackground from "../components/LandingPage/LandingBackground";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  return <div className="landing">
    <i className="spin fa-2x">
      <FontAwesomeIcon icon={ faSyncAlt } />
    </i>
    <div 
      id="title-container" 
      className= "title-container">
      <br></br>
      <br></br>
      <br></br>
      <div className="logo">
        <h2
        id="brand-name" 
        className="landing-text side-text theme-transition">Lu</h2>
        <h1 id="brand-name" 
        className="brand-name landing-text theme-transition">CUBER</h1>
        <h3 id="brand-name" 
        className="landing-text side-text theme-transition">ate</h3>
      </div>
      <h5 className="description landing-text theme-transition">LuCUBERate leverages the convience of a flash card into a third dimension.</h5>
      <h5 className="description landing-text theme-transition">We allow more space and freedom for the unique ways in which <u>you</u> learn.</h5>
      <br></br>
      <h5 
      id="tagline" 
      className="landing-text description theme-transition">Our name is inspired by the word</h5>
      <h5 
      id="tagline" 
      className="landing-text description theme-transition">lu•cu•brate &nbsp;&nbsp;/&nbsp;&nbsp; to write or study (especially by night)
      </h5>
    </div>
    <LandingBackground />
  </div>
}

export default Landing;
