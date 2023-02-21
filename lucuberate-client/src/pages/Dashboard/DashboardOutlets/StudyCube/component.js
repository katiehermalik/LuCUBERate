import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GuideContext,
  CurrentPathContext,
} from "../../../../context/ContextProvider";
import "../../../../assets/App.css";
import GuideModal from "../../../../components/GuideModal/component";
import "./style.css";

const sides = ["Question", "Answer", "Visual Aid", "Link", "Notes", "Hint"];

const StudyCube = () => {
  const {
    cubeData: { cube },
  } = useContext(CurrentPathContext);
  const { showGuide, setShowGuide } = useContext(GuideContext);
  const [side, setSide] = useState("");
  const [isLoadingCube] = useState(false);
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
  }, [cube, showGuide, completedGuide, setShowGuide, isLoadingCube]);

  return (
    <>
      {cube && (
        <>
          <div className="cube-page-container container-column">
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
                    <div className="face Question theme-transition">
                      <div
                        className={`face-title ${
                          side === "Question" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        Question
                        <hr className="theme-transition" />
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
                    <div className="face Answer theme-transition">
                      <div
                        className={`face-title ${
                          side === "Answer" ? "" : "blur pointer-disabled"
                        }`}>
                        Answer
                        <hr className="theme-transition" />
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
                    <div className="face Hint theme-transition">
                      <div
                        className={`face-title ${
                          side === "Hint" ? "" : "blur pointer-disabled"
                        }`}>
                        Hint
                        <hr className="theme-transition" />
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
                    <div className="face Notes theme-transition">
                      <div
                        className={`face-title ${
                          side === "Notes" ? "" : "blur pointer-disabled"
                        }`}>
                        Notes
                        <hr className="theme-transition" />
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
                    <div className="face Visual theme-transition">
                      <div
                        className={`face-title ${
                          side === "Visual Aid" ? "" : "blur pointer-disabled"
                        }`}>
                        Visual Aid
                        <hr className="theme-transition" />
                      </div>
                      {cube.visual_aid && (
                        <a
                          download={cube.visual_aid_url}
                          href={cube.visual_aid_url}
                          title="Download image">
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
                    <div className="face Link theme-transition">
                      <div
                        className={`face-title ${
                          side === "Link" ? "" : "blur pointer-disabled"
                        }`}>
                        Link
                        <hr className="theme-transition" />
                      </div>
                      {(cube.link_1 || cube.link_2 || cube.link_3) && (
                        <div
                          className={`face-content ${
                            side === "Link"
                              ? ""
                              : "blur pointer-disabled face-not-focused"
                          }`}>
                          {cube.link_1 && (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={cube.link_1}>
                              {cube.link_alias_1}
                            </a>
                          )}
                          {cube.link_2 && (
                            <>
                              <br />
                              <br />
                              <a
                                style={{ fontSize: "12px" }}
                                rel="noreferrer"
                                target="_blank"
                                href={cube.link_2}>
                                {cube.link_alias_2}
                              </a>
                            </>
                          )}
                          {cube.link_3 && (
                            <>
                              <br />
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={cube.link_3}>
                                {cube.link_alias_3}
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
