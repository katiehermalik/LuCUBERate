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
    if (sideRefs.current.length) {
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
                        className={`face-group ${
                          side === "Question" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Question</div>
                        {cube.question && (
                          <div className="face-content">{cube.question}</div>
                        )}
                      </div>
                    </div>
                    <div className="face Answer">
                      <div
                        className={`face-group ${
                          side === "Answer" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Answer</div>
                        {cube.answer && (
                          <div className="face-content">{cube.answer}</div>
                        )}
                      </div>
                    </div>
                    <div className="face Hint">
                      <div
                        className={`face-group ${
                          side === "Hint" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Hint</div>
                        {cube.hint && (
                          <div className="face-content">{cube.hint}</div>
                        )}
                      </div>
                    </div>
                    <div className="face Notes">
                      <div
                        className={`face-group ${
                          side === "Notes" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Notes</div>
                        {cube.notes && (
                          <div className="face-content">{cube.notes}</div>
                        )}
                      </div>
                    </div>
                    <div className="face Visual">
                      <div
                        className={`face-group ${
                          side === "Visual Aid" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Visual Aid</div>
                        {cube.visual_aid && (
                          <a
                            download={cube.visual_aid_url}
                            href={cube.visual_aid_url}
                            title="Download image"
                            className="face-content">
                            <img
                              src={cube.visual_aid_url}
                              alt="visual aid"
                              className="visual-aid"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="face Links">
                      <div
                        className={`face-group ${
                          side === "Links" || side === ""
                            ? ""
                            : "blur pointer-disabled"
                        }`}>
                        <div className="face-title">Links</div>
                        {(cube.link_1.url ||
                          cube.link_2.url ||
                          cube.link_3.url) && (
                          <div className="face-content">
                            <ul>
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
                          </div>
                        )}
                      </div>
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
