import LandingBackground from "../components/LandingPage/LandingBackground";

const Landing = () => {
  return (
    <div className="landing">
      <div id="title-container" className="title-container">
        <section className="about landing-text">
          <h1 className="brand-name">LUCUBERATE</h1>
          <section className="description theme-transition">
            <h3>
              <span className="force-line-break">
                <span className="force-line-break">
                  Lucuberate &#40;&nbsp;lu•cuber•ate&nbsp;&#41;&nbsp;
                </span>
                <span className="force-line-break">
                  leverages the convience&nbsp;
                </span>
              </span>
              <span className="force-line-break">
                <span className="force-line-break">
                  of a flash card into&nbsp;
                </span>
                <span className="force-line-break">a third dimension.</span>
              </span>
            </h3>
            <br />
            <h3>
              <span className="force-line-break">
                <span className="force-line-break">We allow more&nbsp;</span>
                <span className="force-line-break">
                  space and freedom&nbsp;
                </span>
              </span>
              <span className="force-line-break">
                <span className="force-line-break">
                  for the unique ways&nbsp;
                </span>
                <span className="force-line-break">
                  in which&nbsp;
                  <u>
                    <b>you&nbsp;</b>
                  </u>
                  learn.
                </span>
              </span>
            </h3>
            <br />
            <h4>Our name is inspired by the word:</h4>
            <h4>lu•cu•brate&nbsp;&nbsp;/&nbsp;&nbsp;to write or study</h4>
            <h4>&#40;&nbsp;especially by night&nbsp;&#41;</h4>
          </section>
        </section>
      </div>
      <LandingBackground />
    </div>
  );
};

export default Landing;
