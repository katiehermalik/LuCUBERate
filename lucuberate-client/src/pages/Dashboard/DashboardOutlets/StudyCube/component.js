import React, { useState, useEffect, useRef, useContext } from "react";
import {
  CurrentPathContext,
  GuideContext,
} from "../../../../context/ContextProvider";
import "../../../../assets/App.css";
import GuideModal from "../../../../components/GuideModal";
import Loading from "../../../../components/Loading";
import "./style.css";

const sides = ["Question", "Answer", "Visual Aid", "Links", "Notes", "Hint"];

const StudyCube = ({ cubeIsLoading }) => {
  const {
    cubeData: { cube },
  } = useContext(CurrentPathContext);
  const { showGuide, setShowGuide } = useContext(GuideContext);
  const [side, setSide] = useState("");
  const { completedGuide } =
    JSON.parse(localStorage.getItem("completedGuide")) || "";
  const sideRefs = useRef([]);

  useEffect(() => {
    document.title = "Lucuberate | Study Cube";
    showGuide && !completedGuide && setShowGuide(true);
    setSide("Question");
    if (sideRefs.current.length !== 0) {
      sideRefs.current.forEach((ref, i) => {
        if (i === 0) ref.checked = true;
        else ref.checked = false;
      });
    }
  }, [cube, showGuide, completedGuide, setShowGuide]);

  return (
    <>
      {!cube || cubeIsLoading ? (
        <Loading />
      ) : (
        <>
          <div className="cube-page-container container-column">
            <div className="cube-ctrl-group container-row">
              <fieldset className="radio-face-group">
                <legend hidden>
                  Select wich side of the cube you would like to view
                </legend>
                <ul className="cube-face-list">
                  {sides.map((side, i) => (
                    <li key={`list-item${side}`} className="radio-button">
                      <input
                        type="radio"
                        name="rotate-cube-side"
                        value={side}
                        id={side}
                        ref={element => {
                          if (element) {
                            sideRefs.current[i] = element;
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
            {showGuide && !completedGuide && (
              <div className="guide-background"></div>
            )}
            <div className="cube-area-container">
              {showGuide && !completedGuide && <GuideModal />}
              <div className="cube-area">
                <div className="cube-container">
                  <div className={`study-cube ${side}`}>
                    <div className="face Question">
                      <div
                        className={`face-title ${
                          side === "Question" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        Question
                        <hr />
                      </div>
                      {cube.question && (
                        <div
                          className={`face-content ${
                            side === "Question" || side === ""
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.question}
                        </div>
                      )}
                    </div>
                    <div className="face Answer">
                      <div
                        className={`face-title ${
                          side === "Answer" ? "" : "blur pointer-disabled"
                        }`}>
                        Answer
                        <hr />
                      </div>
                      {cube.answer && (
                        <div
                          className={`face-content ${
                            side === "Answer"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.answer}
                        </div>
                      )}
                    </div>
                    <div className="face Hint">
                      <div
                        className={`face-title ${
                          side === "Hint" ? "" : "blur pointer-disabled"
                        }`}>
                        Hint
                        <hr />
                      </div>
                      {cube.hint && (
                        <div
                          className={`face-content ${
                            side === "Hint"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.hint}
                        </div>
                      )}
                    </div>
                    <div className="face Notes">
                      <div
                        className={`face-title ${
                          side === "Notes" ? "" : "blur pointer-disabled"
                        }`}>
                        Notes
                        <hr />
                      </div>
                      {cube.notes && (
                        <div
                          className={`face-content ${
                            side === "Notes"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.notes}
                        </div>
                      )}
                    </div>
                    <div className="face Visual">
                      <div
                        className={`face-title ${
                          side === "Visual Aid" ? "" : "blur pointer-disabled"
                        }`}>
                        Visual Aid
                        <hr />
                      </div>
                      {cube.visual_aid && (
                        <a
                          download={cube.visual_aid_url}
                          href={cube.visual_aid_url}
                          title="Download image"
                          className={`face-content ${
                            side === "Visual Aid"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          <img
                            src={cube.visual_aid_url}
                            alt="visual aid"
                            className={`visual-aid ${
                              side === "Visual Aid"
                                ? ""
                                : "blur pointer-disabled face-not-focused"
                            }`}
                          />
                        </a>
                      )}
                    </div>
                    <div className="face Links">
                      <div
                        className={`face-title ${
                          side === "Links" ? "" : "blur pointer-disabled"
                        }`}>
                        Links
                        <hr />
                      </div>
                      {(cube.link_1.url ||
                        cube.link_2.url ||
                        cube.link_3.url) && (
                        <ul
                          className={`face-content ${
                            side === "Links"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.link_1.url && (
                            <li>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={cube.link_1.url}>
                                {cube.link_1.alias}
                              </a>
                              <br />
                              <br />
                            </li>
                          )}
                          {cube.link_2.url && (
                            <li>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={cube.link_2.url}>
                                {cube.link_2.alias}
                              </a>
                              <br />
                              <br />
                            </li>
                          )}
                          {cube.link_3.url && (
                            <li>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={cube.link_3.url}>
                                {cube.link_3.alias}
                              </a>
                            </li>
                          )}
                        </ul>
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
