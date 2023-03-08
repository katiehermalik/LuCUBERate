import { useState, useEffect, useContext } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  AlertFillIcon,
} from "@primer/octicons-react";
import { UserContext } from "../../context/ContextProvider";
import LandingCanvas from "../../features/threeJS/LandingCanvas";
import AuthBtn from "../../features/authentication/components/AuthBtn";
import "./style.css";

const Landing = () => {
  const { currentUserInfo: user } = useContext(UserContext);
  const [showLearnMore, setShowLearnMore] = useState(true);
  const [showRMInfo, setShowRMInfo] = useState(false);
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
      <section className={`splash ${user ? "mobile-nav-is-shown" : ""}`}>
        <div className={`cube-scene ${user ? "mobile-nav-is-shown" : ""}`}>
          <div className="copy-container">
            <header className="headline">
              <h1 className="brand-name">LUCUBERATE</h1>
              <h3 className="tagline">
                &#40;&nbsp;lu•cuber•ate&nbsp;&#41; is a study app that leverages
                the convience of a flash card into a third dimension. We allow
                more space and freedom for the unique ways in which&nbsp;
                <u>
                  <b>you</b>
                </u>
                &nbsp;learn.
              </h3>
            </header>
            <aside className="fun-fact">
              <span>
                <span className="force-line-break">Our name is&nbsp;</span>
                <span className="force-line-break">inspired by&nbsp;</span>
                <span className="force-line-break">the word...&nbsp;</span>
              </span>
              <hr />
              <b>
                <span className="force-line-break">lu•cu•brate:&nbsp;</span>
                <span className="force-line-break">to write or study</span>
                <span className="force-line-break">
                  &#40;&nbsp;especially by night&nbsp;&#41;
                </span>
              </b>
            </aside>
          </div>
          <LandingCanvas user={user} />
        </div>
        <section
          className={`learn-more section ${user ? "mobile-nav-is-shown" : ""}`}>
          <div className="section-content">
            <div className="sign-up-cta">
              <h3>Let us help you achieve your academic goals!</h3>
              {!user && <AuthBtn authType={"Sign Up"} />}
            </div>
            <div className={`bounce ${!showLearnMore ? "hide" : ""}`}>
              <h3>Learn more</h3>
              <ChevronDownIcon size={24} />
            </div>
          </div>
        </section>
      </section>
      <section className="celebrate section">
        <div className="section-content">
          <div>
            <h3>
              <span className="force-line-break">
                We celebrate the fact&nbsp;
              </span>
              <span className="force-line-break">
                that everyone learns&nbsp;
              </span>
              <span className="force-line-break">in different ways!</span>
            </h3>
            <p>
              Traditional flash cards can be monotonous and difficult to
              remember. That's why we've created an innovative platform that
              uses 3D flash cubes instead of flash cards to make studying more
              fun and engaging.
            </p>
          </div>
        </div>
      </section>
      <section className="about-app section">
        <div className="section-content">
          <img
            src="/sneak_peek.png"
            alt="A look inside the app with a study cube in mid-spin."
          />
          <div className="copy-container ">
            <h3>
              <span className="force-line-break">
                Tailor your study materials&nbsp;
              </span>
              <span className="force-line-break">to your specific needs.</span>
            </h3>
            <p>
              Our flash cubes are designed to help you remember information
              better by making learning more personal and interative. Create as
              many of your own custom cubes and categories as you need. With six
              sides to each cube, you'll be able to add notes, hints, visual
              aids, and links to resources, providing a more complete and
              immersive learning experience.
            </p>
          </div>
        </div>
      </section>
      <section className="start-studying section">
        <div className="section-content">
          {!user ? (
            <>
              <h3>
                <span className="force-line-break">
                  Ready to take your&nbsp;
                </span>
                <span className="force-line-break">
                  studying to another&nbsp;
                </span>
                <span className="force-line-break">dimension?</span>
              </h3>
              <p>
                Sign up now and start studying smarter with Lucuberate flash
                cubes!
              </p>
              <AuthBtn authType={"Sign Up"} />
            </>
          ) : (
            <>
              <h3>Ready to take your studying to another dimension?</h3>
              <p>Study smarter with Lucuberate flash cubes!</p>
            </>
          )}
        </div>
      </section>
      <section className="about-developer section">
        <div className="section-content">
          <h3>About the developer</h3>
          <p>
            Meet Katie, a talented front-end developer with a passion for
            community, problem solving, and creative expression. With a unique
            background in art and education, Katie has always been drawn to the
            intersection of technology and creativity, and has found a perfect
            outlet for her talents in web development.
          </p>
          <p>
            She sees her love for art as a complement to her work as a
            developer, both requiring attention to detail and a willingness to
            experiment and try new things. Whether its learning a new
            technology, troubleshooing a tricky bug, or getting her hands dirty
            in a new art medium, Katie approaches every task with curiousity,
            enthusiasm, and dedication.
          </p>
          <p>
            Katie is also deeply committed to community and believes that
            collaboration is the key to success. She believes that the web has
            the power to bring people together and is dedicated to making it a
            more accessible and inclusive place for everyone.
          </p>
        </div>
      </section>
      <footer
        className={`contact section ${user ? "mobile-nav-is-shown" : ""}`}>
        <div className="section-content">
          <h3>Contact us</h3>
          <div className="copy-container ">
            <div>
              <p>
                Lucuberate is a passion project. We hope everyone finds the
                flash cubes beneficial and we welcome all feedback and prospects
                for collaboration. Please don't hesitate to get in touch!
              </p>
              <p className="warning mobile-hidden">
                <AlertFillIcon size={16} />
                <p>
                  <b>Warning: </b>This website uses spinning animations that may
                  cause discomfort in users with vestibular motion disorders.
                  Users may wish to enable the "reduce motion" feature on their
                  device before using any website that has animations.
                  {showRMInfo ? (
                    <>
                      <div onClick={() => setShowRMInfo(!showRMInfo)}>
                        <b>Show less</b>
                        <ChevronDownIcon size={16} />
                      </div>
                      <p>
                        The "reduce motion" feature can typically be found in
                        the accessibility settings of most devices, and it can
                        significantly reduce the amount of motion on websites
                        and other apps. By turning on this feature, animations
                        are replaced with simpler, static images, which can be
                        much easier for users with vestibular disorders to view
                        without experiencing discomfort.
                      </p>
                    </>
                  ) : (
                    <div onClick={() => setShowRMInfo(!showRMInfo)}>
                      <b>Show more</b>
                      <ChevronRightIcon size={16} />
                    </div>
                  )}
                </p>
              </p>
              <p className="mobile-hidden">{`Copyright \u00A9 ${new Date().getFullYear()} Katie Hermalik`}</p>
            </div>
            <div className="contact-info">
              <p>
                Questions about Lucuberate
                <br />
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="mailto:support@lucuberate.com">
                  <b>support@lucuberate.com</b>
                </a>
              </p>
              <p>
                Get in touch with Katie directly
                <br />
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="mailto:khermalik@gmail.com">
                  <b>khermalik@gmail.com</b>
                </a>
              </p>
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/katiehermalik">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0,0,256,256"
                    style={{ fill: "#000000" }}>
                    <g
                      fill="var(--social-link-color)"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}>
                      <g transform="scale(4,4)">
                        <path d="M32,10c12.15,0 22,9.85 22,22c0,9.768 -6.369,18.045 -15.179,20.916c0.002,-0.008 0.006,-0.021 0.006,-0.021c0,0 -1.485,-0.696 -1.453,-1.938c0.035,-1.367 0,-4.556 0,-5.727c0,-2.01 -1.272,-3.434 -1.272,-3.434c0,0 9.977,0.112 9.977,-10.533c0,-4.107 -2.147,-6.245 -2.147,-6.245c0,0 1.128,-4.385 -0.39,-6.245c-1.701,-0.184 -4.749,1.626 -6.05,2.472c0,0 -2.062,-0.846 -5.492,-0.846c-3.43,0 -5.492,0.846 -5.492,0.846c-1.301,-0.846 -4.348,-2.656 -6.05,-2.472c-1.518,1.86 -0.39,6.245 -0.39,6.245c0,0 -2.147,2.137 -2.147,6.245c0,10.645 9.977,10.533 9.977,10.533c0,0 -1.005,1.136 -1.225,2.806c-0.696,0.236 -1.721,0.528 -2.549,0.528c-2.165,0 -3.812,-2.105 -4.416,-3.078c-0.595,-0.96 -1.815,-1.766 -2.953,-1.766c-0.749,0 -1.115,0.375 -1.115,0.803c0,0.428 1.05,0.727 1.743,1.521c1.461,1.674 1.435,5.438 6.641,5.438c0.565,0 1.719,-0.139 2.588,-0.256c-0.005,1.185 -0.007,2.436 0.012,3.167c0.031,1.242 -1.453,1.938 -1.453,1.938c0,0 0.004,0.012 0.006,0.021c-8.808,-2.873 -15.177,-11.15 -15.177,-20.918c0,-12.15 9.85,-22 22,-22z"></path>
                      </g>
                    </g>
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/katiehermalik/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0,0,256,256"
                    style={{ fill: "#000000" }}>
                    <g
                      fill="var(--social-link-color)"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}>
                      <g transform="scale(4,4)">
                        <path d="M40.227,12c10.918,0 11.773,0.854 11.773,11.773v16.453c0,10.919 -0.855,11.774 -11.773,11.774h-16.454c-10.918,0 -11.773,-0.855 -11.773,-11.773v-16.454c0,-10.919 0.855,-11.773 11.773,-11.773zM25.029,43v-16.272h-5.057v16.272zM22.501,24.401c1.625,0 2.947,-1.322 2.947,-2.949c0,-1.625 -1.322,-2.947 -2.947,-2.947c-1.629,0 -2.949,1.32 -2.949,2.947c0,1.627 1.318,2.949 2.949,2.949zM44,43v-8.925c0,-4.382 -0.946,-7.752 -6.067,-7.752c-2.46,0 -4.109,1.349 -4.785,2.628h-0.068v-2.223h-4.851v16.272h5.054v-8.05c0,-2.122 0.405,-4.178 3.036,-4.178c2.594,0 2.628,2.427 2.628,4.315v7.913z"></path>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
              <hr className="desktop-hidden"></hr>
              <p className="warning desktop-hidden">
                <AlertFillIcon size={16} />
                <p>
                  <b>Warning: </b>This website uses spinning animations that may
                  cause discomfort in users with vestibular motion disorders.
                  Users may wish to enable the "reduce motion" feature on their
                  device before using any website that has animations.
                  {showRMInfo ? (
                    <>
                      <div onClick={() => setShowRMInfo(!showRMInfo)}>
                        <b>Show less</b>
                        <ChevronDownIcon size={16} />
                      </div>
                      <p>
                        The "reduce motion" feature can typically be found in
                        the accessibility settings of most devices, and it can
                        significantly reduce the amount of motion on websites
                        and other apps. By turning on this feature, animations
                        are replaced with simpler, static images, which can be
                        much easier for users with vestibular disorders to view
                        without experiencing discomfort.
                      </p>
                    </>
                  ) : (
                    <div onClick={() => setShowRMInfo(!showRMInfo)}>
                      <b>Show more</b>
                      <ChevronRightIcon size={16} />
                    </div>
                  )}
                </p>
              </p>
              <p className="copyright desktop-hidden">{`Copyright \u00A9 ${new Date().getFullYear()} Katie Hermalik`}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
