import LandingBackground from "../components/LandingPage/LandingBackground";

function Landing() {
  return(
    <div className="landing">
      <div 
        id="title-container" 
        className= "title-container">
        <br></br>
        <br></br>
        <br></br>
        <h1 
        id="brand-name" 
        className="brand-name landing-text">LuCUBERate</h1>
        <h4 
        id="tagline" 
        className="landing-text tagline">lu•cu•brate &nbsp;&nbsp;/&nbsp;&nbsp; to write or study (especially by night)</h4>
        <br></br>
        <br></br>
        <h5 className="description landing-text">LuCUBERate leverages the convience of a flash card into the third dimension.</h5>
        <h5 className="description landing-text">We allow more space and freedom for the way that <u>you</u> learn.</h5>
      </div>
      <LandingBackground />
    </div>
  )
}

export default Landing;
