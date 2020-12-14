import LandingBackground from "../components/LandingPage/LandingBackground";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return(
    <>
    <div className="landing">
      <i className="spin fa-2x">
      <FontAwesomeIcon icon={ faSyncAlt } /></i>
      <div 
        id="title-container" 
        className= "title-container">
        <br></br>
        <br></br>
        <br></br>
        <div className="logo">
        <h2
        id="brand-name" 
        className="landing-text side-text">Lu</h2>
        <h1 id="brand-name" 
        className="brand-name landing-text">CUBER</h1>
        <h3 id="brand-name" 
        className="landing-text side-text">ate</h3>
        </div>
        <h4 
        id="tagline" 
        className="landing-text tagline">lu•cu•brate &nbsp;&nbsp;/&nbsp;&nbsp; to write or study (especially by night)</h4>
        <br></br>
        <br></br>
        <h5 className="description landing-text">LuCUBERate leverages the convience of a flash card into a third dimension.</h5>
        <h5 className="description landing-text">We allow more space and freedom for the way that <u>you</u> learn.</h5>
      </div>
      <LandingBackground />
    </div>
    </>
  )
}

export default Landing;
