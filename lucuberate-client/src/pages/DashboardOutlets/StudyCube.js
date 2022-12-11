import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext, GuideContext } from "../../context/ContextProvider";
import "../../App.css";
import GuideModal from "../../components/GuideModal";

const sides = ["Question", "Answer", "Visual Aid", "Link", "Notes", "Hint"];

const StudyCube = ({ cubeData }) => {
  const { currentUserInfo } = useContext(UserContext);
  const { showGuide, setShowGuide } = useContext(GuideContext);
  const [side, setSide] = useState("");
  const [isLoadingCube] = useState(false);
  const sessionData = JSON.parse(sessionStorage.getItem("user")) || "";
  const sideRefs = useRef([]);

  useEffect(() => {
    document.title = "Lucuberate | Study Cube";
    currentUserInfo?.newUser &&
      !sessionData.completedGuide &&
      setShowGuide(true);
    setSide("Question");
    if (sideRefs.current.length !== 0) {
      sides.forEach((side, i) => {
        if (i === 0) sideRefs.current[i].current.checked = true;
        else sideRefs.current[i].current.checked = false;
      });
    }
  }, [
    cubeData,
    currentUserInfo?.newUser,
    sessionData.completedGuide,
    setShowGuide,
    isLoadingCube,
  ]);

  return (
    <>
      {cubeData && (
        <>
          <div className="show-page-container container-column">
            <div className="cube-ctrl-group container-row theme-transition">
              <fieldset className="radio-face-group">
                <legend hidden>
                  Select wich side of the cube you would like to view
                </legend>
                <ul className="cube-face-list theme-transition">
                  {sides.map((side, i) => (
                    <li key={`list-item${side}`} className="radio-button">
                      <input
                        type="radio"
                        name="rotate-cube-side"
                        value={side}
                        id={side}
                        ref={element => {
                          if (element) {
                            sideRefs[i] = element;
                          }
                        }}
                        onChange={() => setSide(side)}
                      />
                      <label
                        className="radio-label"
                        htmlFor={side}
                        title={`View ${side} side of cube`}>
                        {side}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>
            {showGuide && <div className="guide-background"></div>}
            <div className="cube-area-container">
              {currentUserInfo?.newUser && showGuide && <GuideModal />}
              <div className="cube-area">
                <div className="cube-container">
                  <div className={`study-cube ${side}`}>
                    <div className="face Question theme-transition">
                      <div
                        className={`face-title ${
                          side === "Question" || side === "" ? "" : "blur"
                        }`}>
                        Question
                      </div>
                      {cubeData.question && (
                        <div
                          className={`face-content ${
                            side === "Question" || side === "" ? "" : "blur"
                          }`}>
                          {cubeData.question}
                        </div>
                      )}
                    </div>
                    <div className="face Answer theme-transition">
                      <div
                        className={`face-title ${
                          side === "Answer" ? "" : "blur"
                        }`}>
                        Answer
                      </div>
                      {cubeData.answer && (
                        <div
                          className={`face-content ${
                            side === "Answer" ? "" : "blur"
                          }`}>
                          {cubeData.answer}
                        </div>
                      )}
                    </div>
                    <div className="face Hint theme-transition">
                      <div
                        className={`face-title ${
                          side === "Hint" ? "" : "blur"
                        }`}>
                        Hint
                      </div>
                      {cubeData.hint && (
                        <div
                          className={`face-content ${
                            side === "Hint" ? "" : "blur"
                          }`}>
                          {cubeData.hint}
                        </div>
                      )}
                    </div>
                    <div className="face Notes theme-transition">
                      <div
                        className={`face-title ${
                          side === "Notes" ? "" : "blur"
                        }`}>
                        Notes
                      </div>
                      {cubeData.notes && (
                        <div
                          className={`face-content ${
                            side === "Notes" ? "" : "blur"
                          }`}>
                          {cubeData.notes}
                        </div>
                      )}
                    </div>
                    <div className="face Visual theme-transition">
                      <div
                        className={`face-title ${
                          side === "Visual Aid" ? "" : "blur"
                        }`}>
                        Visual Aid
                      </div>
                      {cubeData.visual_aid && (
                        <a
                          download={cubeData.visual_aid_url}
                          href={cubeData.visual_aid_url}
                          title="Download image">
                          <img
                            src={cubeData.visual_aid_url}
                            alt="visual aid"
                            className={`visual-aid ${
                              side === "Visual Aid" ? "" : "blur"
                            }`}
                          />
                        </a>
                      )}
                    </div>
                    <div className="face Link theme-transition">
                      <div
                        className={`face-title ${
                          side === "Link" ? "" : "blur"
                        }`}>
                        Link
                      </div>
                      {(cubeData.link_1 ||
                        cubeData.link_2 ||
                        cubeData.link_3) && (
                        <div
                          className={`face-content ${
                            side === "Link" ? "" : "blur"
                          }`}>
                          {cubeData.link_1 && (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={cubeData.link_1}>
                              {cubeData.link_alias_1}
                            </a>
                          )}
                          {cubeData.link_2 && (
                            <>
                              <br />
                              <br />
                              <a
                                style={{ fontSize: "12px" }}
                                rel="noreferrer"
                                target="_blank"
                                href={cubeData.link_2}>
                                {cubeData.link_alias_2}
                              </a>
                            </>
                          )}
                          {cubeData.link_3 && (
                            <>
                              <br />
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={cubeData.link_3}>
                                {cubeData.link_alias_3}
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudyCube;
