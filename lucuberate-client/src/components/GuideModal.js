import React, { useState, useRef, useContext } from "react";
import { UserContext, GuideContext } from "../context/ContextProvider";
import { ChevronLeftIcon } from "@primer/octicons-react";
import UserModel from "../models/user";

const GuideModal = () => {
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const guideDecision = useRef();
  const [tourStep, setTourStep] = useState(1);
  const [exitGuide, setExitGuide] = useState(false);
  const sessionData = JSON.parse(sessionStorage.getItem("user")) || {};

  const handleClick = () => {
    tourStep !== 3 && setTourStep(prevState => (prevState += 1));
    if (guideDecision.current?.checked) {
      UserModel.update({ newUser: false }, currentUserInfo._id);
      setCurrentUserInfo(prevState => ({ ...prevState, newUser: false }));
    } else if (tourStep === 3) {
      setShowGuide(false);
      let prevData = JSON.parse(sessionStorage.getItem("user"));
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...prevData,
          completedGuide: true,
        })
      );
    }
  };

  const handleBackClick = () => {
    setTourStep(prevState => (prevState -= 1));
  };

  return (
    <aside
      className={`modal-guide theme-transition ${
        (tourStep === 1 &&
          (sessionData.returnUser
            ? "tour-step-1 return-user"
            : "tour-step-1")) ||
        (tourStep === 2 &&
          (sessionData.returnUser
            ? "tour-step-2 return-user"
            : "tour-step-2")) ||
        (tourStep === 3 &&
          (sessionData.returnUser ? "tour-step-3 return-user" : "tour-step-3"))
      }`}>
      <div className="modal-header">
        {(tourStep === 1 && sessionData.returnUser && <h4>Welcome back!</h4>) ||
          (tourStep === 1 && <h4>Welcome to LuCUBERate!</h4>)}
        {tourStep === 2 && <h4>Category & Cube List</h4>}
        {tourStep === 3 && <h4>Cube Controls</h4>}
      </div>
      <hr className="theme-transition" />
      <div className="modal-guide-body">
        {(tourStep === 1 && sessionData.returnUser && (
          <p>
            We hope you've found your way around okay. Please use the following
            screens to review all that LuCuberate can offer. If you no longer
            need this guide, just click the box below and we'll leave you to it.
          </p>
        )) ||
          (tourStep === 1 && (
            <>
              <p>
                Ready to start studying? We've created some example cubes and
                categories to help get you started. We're looking at you, visual
                learners!
              </p>
              <p>
                If you'd rather not dive into any of these subjects right now,
                just delete the category and all the cubes will go with it!
              </p>
            </>
          ))}
        {tourStep === 2 && (
          <>
            <p>Use the controls you'll find here for the following:</p>
            <ul>
              <li>navigate between categories and cubes</li>
              <li>create a new cube</li>
              <li>create a new category while creating a new cube</li>
              <li>edit cubes, including moving them to different categories</li>
              <li>
                delete any cubes or categories once you become a subject matter
                expert!
              </li>
            </ul>
          </>
        )}
        {tourStep === 3 && (
          <>
            <p>
              Use the controls above to navigate to the different sides of the
              cubes. Go ahead, take one for a spin!
            </p>
            <p>Happy studying!</p>
          </>
        )}
      </div>
      <div className="modal-footer theme-transition">
        {(sessionData.returnUser || tourStep === 3) && (
          <form>
            <input
              type="checkbox"
              id="guide-decision"
              ref={guideDecision}
              onClick={() => {
                setExitGuide(prev => !prev);
              }}
            />
            <label htmlFor="guide-decision">
              Don't show <br /> this again.
            </label>
          </form>
        )}
        <div>
          {tourStep !== 1 && (
            <button
              title="Back"
              aria-label="Back"
              onClick={handleBackClick}
              className="form-btn btn-secondary">
              <ChevronLeftIcon size={24} />
            </button>
          )}
          <button
            onClick={handleClick}
            type="button"
            title={`${
              (tourStep === 1 &&
                (exitGuide
                  ? "Exit guide"
                  : "Tell me about the categories and cubes")) ||
              (tourStep === 2 &&
                (exitGuide
                  ? "Exit guide"
                  : "Tell me about the cube controls")) ||
              (tourStep === 3 && "Close guide and start studying")
            }`}
            aria-label={`${
              (tourStep === 1 &&
                (exitGuide
                  ? "Exit guide"
                  : "Tell me about the categories and cubes")) ||
              (tourStep === 2 &&
                (exitGuide
                  ? "Exit guide"
                  : "Tell me about the cube controls")) ||
              (tourStep === 3 && "Close guide and start studying")
            }`}
            className="form-btn btn-primary">
            {tourStep === 1 && (
              <span>{exitGuide ? "Exit guide" : "Tell me more"}</span>
            )}
            {tourStep === 2 && (
              <span>{exitGuide ? "Exit guide" : "Ok, got it"}</span>
            )}
            {tourStep === 3 && <span>Start studying</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
//guideDecision.current.checked

export default GuideModal;
