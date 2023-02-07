import { useState, useRef, useContext, useEffect } from "react";
import {
  UserContext,
  GuideContext,
  CategoryListContext,
} from "../context/ContextProvider";
import { ChevronLeftIcon } from "@primer/octicons-react";
import UserAPI from "../utils/api/user";
import { SmileyIcon } from "@primer/octicons-react";

const GuideModal = () => {
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);
  const {
    currentUserInfo: { newUser },
  } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowCategoryList } = useContext(CategoryListContext);
  const guideDecision = useRef();
  const [tourStep, setTourStep] = useState(1);

  useEffect(() => {
    setShowCategoryList(false);
  }, [setShowCategoryList]);

  const handleStepForwardClick = async () => {
    tourStep !== 4 &&
      setTourStep(prevState => {
        prevState === 1 && setShowCategoryList(true);
        if (prevState === 2 && !newUser) {
          return (prevState += 2);
        } else {
          return (prevState += 1);
        }
      });
    if (tourStep === 4 && guideDecision.current?.checked) {
      await UserAPI.update(
        { newUser: false, showGuideModal: false },
        currentUserInfo._id
      );
      setCurrentUserInfo(prevState => ({
        ...prevState,
        newUser: false,
        showGuideModal: false,
      }));
      setShowGuide(false);
    } else if (tourStep === 4) {
      await UserAPI.update({ newUser: false }, currentUserInfo._id);
      setShowGuide(false);
      localStorage.setItem(
        "completedGuide",
        JSON.stringify({
          completedGuide: true,
        })
      );
    }
  };

  const handleBackClick = () => {
    setTourStep(prevState => {
      if (prevState === 4 && !newUser) {
        return (prevState -= 2);
      } else {
        prevState === 2 && setShowCategoryList(false);
        return (prevState -= 1);
      }
    });
  };

  return (
    <aside
      className={`modal-guide theme-transition ${
        (tourStep === 1 &&
          (newUser ? "tour-step-1" : "tour-step-1 return-user")) ||
        (tourStep === 2 &&
          (newUser ? "tour-step-2" : "tour-step-2 return-user")) ||
        (tourStep === 3 &&
          (newUser ? "tour-step-3" : "tour-step-3 return-user")) ||
        (tourStep === 4 &&
          (newUser ? "tour-step-4" : "tour-step-4 return-user"))
      }`}>
      <div className="modal-header">
        {tourStep === 1 &&
          (newUser ? <h1>Welcome to Lucuberate!</h1> : <h1>Welcome back!</h1>)}
        {tourStep === 2 && <h1>Category & Cube List</h1>}
        {tourStep === 3 && <h1>Example Categories & Cubes</h1>}
        {tourStep === 4 && <h1>Cube Controls</h1>}
      </div>
      <hr className="theme-transition" />
      <div className="modal-guide-body">
        {tourStep === 1 &&
          (newUser ? (
            <p>
              Ready to start studying? We've created some example cubes and
              categories to help get you started.
            </p>
          ) : (
            <>
              <p>
                We hope you're finding the cubes useful on your educational
                journey!
              </p>
              <p>
                Please use the following screens to review all that LuCuberate
                has to offer.
              </p>
            </>
          ))}
        {tourStep === 2 && (
          <>
            <p>Use the controls you'll find in this list for the following:</p>
            <ul>
              <li>Navigate between categories and cubes.</li>
              <li>Create a new cube.</li>
              <li>Create a new category while creating a new cube.</li>
              <li>
                Edit cubes &#40;including moving them to different
                categories&#41;.
              </li>
              <li>
                Delete any cubes or categories once you become a subject matter
                expert!
              </li>
            </ul>
          </>
        )}
        {tourStep === 3 && (
          <>
            <p>
              If you'd rather not dive into Quantum Physics right now &#40;or
              any of these subjects&#41;, just delete the category and all the
              cubes will go with it!
            </p>
            <p>
              Click on the 'Create New Cube' button to get started making your
              own cubes.
            </p>
          </>
        )}
        {tourStep === 4 && (
          <>
            <p>
              Use the controls above to navigate to the different sides of the
              cubes. Go ahead, take one for a SPIN!
            </p>
            <p>Happy studying!</p>
          </>
        )}
      </div>
      <div className="modal-footer theme-transition">
        {tourStep === 1 && !newUser && (
          <p className="subtext">
            If you no longer need this guide, check the box at the end and we'll
            leave you to your studies, undisturbed.&nbsp;
            <SmileyIcon size={16} className="label-icon" />
          </p>
        )}
        {tourStep === 4 && (
          <form>
            <input type="checkbox" id="guide-decision" ref={guideDecision} />
            <label htmlFor="guide-decision">
              Don't show <br /> this again.
            </label>
          </form>
        )}
        <div className="modal-footer-buttons">
          {tourStep !== 1 && (
            <button
              title="Back"
              aria-label="Back"
              onClick={handleBackClick}
              className="btn form-btn btn-secondary">
              <ChevronLeftIcon size={16} />
            </button>
          )}
          <button
            onClick={handleStepForwardClick}
            type="button"
            title={`${
              (tourStep === 1 && "Tell me about the categories and cubes") ||
              (tourStep === 2 && "Tell me more") ||
              (tourStep === 3 && "Tell me about the cube controls") ||
              (tourStep === 4 && "Close guide and start studying")
            }`}
            aria-label={`${
              (tourStep === 1 && "Tell me about the categories and cubes") ||
              (tourStep === 2 && "Tell me more") ||
              (tourStep === 3 && "Tell me about the cube controls") ||
              (tourStep === 4 && "Close guide and start studying")
            }`}
            className="btn form-btn btn-primary">
            {tourStep === 1 &&
              (newUser ? <span>Show Me</span> : <span>Tell Me More</span>)}
            {tourStep === 2 &&
              (newUser ? <span>Tell Me More</span> : <span>Ok, Got It</span>)}
            {tourStep === 3 && <span>Ok, Got It</span>}
            {tourStep === 4 && <span>Start Studying</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default GuideModal;
