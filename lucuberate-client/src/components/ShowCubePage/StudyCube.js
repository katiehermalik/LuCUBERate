import React, { useState, useEffect, useRef } from "react";
import "../../App.css";

const sides = ["Question", "Answer", "Visual Aid", "Link", "Notes", "Hint"];

const StudyCube = props => {
  const [side, setSide] = useState("");
  const [cube, setCube] = useState({});

  // creating refs dynamically when mapping radio buttons
  const createdRefs = [];
  sides.forEach(() => createdRefs.push(React.createRef()));
  const refs = useRef(createdRefs);

  useEffect(() => {
    setCube(props.cube);
    // when cube changes, side and checked radio btn changes to 'question'
    setSide("Question");

    sides.forEach((side, i) => {
      if (i === 0) refs.current[i].current.checked = true;
      else refs.current[i].current.checked = false;
    });
  }, [props.cube]);

  return (
    <>
      {cube && (
        <>
          <div className="cube-ctrl-group container-row theme-transition">
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
                      ref={refs.current[i]}
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
          <div className="cube-area">
            <div className="cube-container">
              <div className={`study-cube ${side || sides[0]}`}>
                <div className="face Question theme-transition">
                  <div
                    className={`face-title ${
                      side === "Question" || side === "" ? "" : "blur"
                    }`}>
                    Question
                  </div>
                  {cube.question && (
                    <div
                      className={`face-content ${
                        side === "Question" || side === "" ? "" : "blur"
                      }`}>
                      {cube.question}
                    </div>
                  )}
                </div>
                <div className="face Link theme-transition">
                  <div
                    className={`face-title ${side === "Link" ? "" : "blur"}`}>
                    Link
                  </div>
                  {cube.link && (
                    <div
                      className={`face-content ${
                        side === "Link" ? "" : "blur"
                      }`}>
                      <a rel="noreferrer" target="_blank" href={cube.link}>
                        {cube.link_alias}
                      </a>
                    </div>
                  )}
                </div>
                <div className="face Hint theme-transition">
                  <div
                    className={`face-title ${side === "Hint" ? "" : "blur"}`}>
                    Hint
                  </div>
                  {cube.hint && (
                    <div
                      className={`face-content ${
                        side === "Hint" ? "" : "blur"
                      }`}>
                      {cube.hint}
                    </div>
                  )}
                </div>
                <div className="face Notes theme-transition">
                  <div
                    className={`face-title ${side === "Notes" ? "" : "blur"}`}>
                    Notes
                  </div>
                  {cube.notes && (
                    <div
                      className={`face-content ${
                        side === "Notes" ? "" : "blur"
                      }`}>
                      {cube.notes}
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
                  {cube.visual_aid && (
                    <a
                      download={cube.visual_aid}
                      href={cube.visual_aid}
                      title="Download image">
                      <img
                        src={cube.visual_aid}
                        alt="visual aid"
                        className={`visual-aid ${
                          side === "Visual Aid" ? "" : "blur"
                        }`}
                      />
                    </a>
                  )}
                </div>
                <div className="face Answer theme-transition">
                  <div
                    className={`face-title ${side === "Answer" ? "" : "blur"}`}>
                    Answer
                  </div>
                  {cube.answer && (
                    <div
                      className={`face-content ${
                        side === "Answer" ? "" : "blur"
                      }`}>
                      {cube.answer}
                    </div>
                  )}
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
