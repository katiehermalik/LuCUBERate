import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@primer/octicons-react";
import LandingCanvas from "../../features/threeJS/LandingCanvas";
import "./style.css";

const Landing = () => {
  const [showLearnMore, setShowLearnMore] = useState(true);
  const controlLearnMore = () => {
    window.scrollY > 100 ? setShowLearnMore(false) : setShowLearnMore(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", controlLearnMore);
    return () => {
      document.removeEventListener("scroll", controlLearnMore);
    };
  }, []);

  return (
    <>
      <div className="landing">
        <div id="title-container" className="title-container">
          <section className="landing-text">
            <h1 className="brand-name">LUCUBERATE</h1>
          </section>
        </div>
        <LandingCanvas />
      </div>
      <section className="description theme-transition">
        <div>
          <aside>
            <h4>
              <span className="force-line-break">Our name is&nbsp;</span>
              <span className="force-line-break">inspired by&nbsp;</span>
              <span className="force-line-break">the word...&nbsp;</span>
              <hr />
              <b>
                <span className="force-line-break">lu•cu•brate:&nbsp;</span>
                <span className="force-line-break">to write or study</span>
                <span className="force-line-break">
                  &#40;&nbsp;especially by night&nbsp;&#41;
                </span>
              </b>
            </h4>
          </aside>
          <h3>
            Lucuberate &#40;&nbsp;lu•cuber•ate&nbsp;&#41; leverages the
            convience of a flash card into a third dimension. We allow more
            space and freedom for the unique ways in which&nbsp;
            <u>
              <b>you</b>
            </u>
            &nbsp;learn.
          </h3>
        </div>
        <div className={`learn-more bounce ${!showLearnMore && "hide"}`}>
          <h3>Learn more</h3>
          <ChevronDownIcon size={24} />
        </div>
      </section>
      <section className="more-info"></section>
    </>
  );
};

export default Landing;
