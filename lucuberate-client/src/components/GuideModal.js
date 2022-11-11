import React, { useState, useContext } from "react";
import { UserContext, NewUserContext } from "../context/ContextProvider";
import { ChevronLeftIcon } from "@primer/octicons-react";

const GuideModal = () => {
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);
  const { setNewUser } = useContext(NewUserContext);
  const [tourStep, setTourStep] = useState(1);

  const handleClick = () => {
    tourStep !== 3 && setTourStep(prev => (prev += 1));
    tourStep === 3 && setNewUser(false);
  };

  const handleBackClick = () => {
    setTourStep(prev => (prev -= 1));
  };

  return (
    <aside
      className={`modal-guide theme-transition ${
        (tourStep === 1 && "tour-step-1") ||
        (tourStep === 2 && "tour-step-2") ||
        (tourStep === 3 && "tour-step-3")
      }`}>
      <div className="modal-header">
        {tourStep === 1 && <h4>Welcome to LuCUBERate!</h4>}
        {tourStep === 2 && <h4>Category & Cube List</h4>}
        {tourStep === 3 && <h4>Cube Controls</h4>}
      </div>
      <hr className="theme-transition" />
      <div className="modal-guide-body">
        {tourStep === 1 && (
          <>
            <p>
              Ready to start studying? We've created some example cubes and
              categories to help get you started. We're looking at you, visual
              learners!
            </p>
            <p>
              If you'd rather not dive into Quantum Physics right now, just
              delete the category and all the cubes will go with it!
            </p>
          </>
        )}
        {tourStep === 2 && (
          <>
            <p>
              Use the controls you'll find in the left hand panel for the
              following:
            </p>
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
            (tourStep === 1 && "Tell me about the categories and cubes") ||
            (tourStep === 2 && "Tell me about the cube controls") ||
            (tourStep === 3 && "Close guide and start studying")
          }`}
          aria-label={`${
            (tourStep === 1 && "Tell me about the categories and cubes") ||
            (tourStep === 2 && "Tell me about the cube controls") ||
            (tourStep === 3 && "Close guide and start studying")
          }`}
          className="form-btn btn-primary">
          {tourStep === 1 && <span>Tell me more</span>}
          {tourStep === 2 && <span>Ok, got it</span>}
          {tourStep === 3 && <span>Start studying</span>}
        </button>
      </div>
    </aside>
  );
};

export default GuideModal;
