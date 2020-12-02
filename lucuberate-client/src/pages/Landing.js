import LandingBackground from "../components/LandingBackground";

function Landing() {
  return(
    <>
      <div id="title-container" className= "">
        <h1 id="brand-name" className="landing-text">LuCUBERate</h1>
        <h4 id="tagline" className="landing-text">lu•cu•brate &nbsp;&nbsp;/&nbsp;&nbsp; to write or study (especially by night)</h4>
      </div>
      <LandingBackground />
    </>
  )
}

export default Landing;
