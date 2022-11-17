import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  XCircleFillIcon,
  PackageIcon,
  InfoIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";

import {
  UserContext,
  CategoryContext,
  CubeContext,
} from "../context/ContextProvider";
import CubeModel from "../models/cube";
import UserModel from "../models/user";
import CategoryModel from "../models/category";

const CubeNew = ({ history }) => {
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { setCurrentCubeId } = useContext(CubeContext);

  const visualAidInputRef = useRef(null);

  // const initialState = {
  //   newCategory: '',
  //   question: '',
  //   answer: '',
  //   hint: '',
  //   notes: '',
  //   link: '',
  //   link_alias: '',
  //   visual_aid: '',
  //   newCategoryCount: 0,
  //   questionCount: 0,
  //   answerCount: 0,
  //   hintCount: 0,
  //   notesCount: 0,
  //   linkAliasCount: 0,
  //   categoryError: '',
  //   questionError: '',
  //   answerError: '',
  //   visualAidError: '',
  //   categoryIsNew: false,
  //   isLoading: false,
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);

  const [newCategory, setNewCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [notes, setNotes] = useState("");
  const [link, setLink] = useState("");
  const [link_alias, setLinkAlias] = useState("");
  const [visual_aid, setVisualAid] = useState("");
  const [newCategoryCount, setNewCategoryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [linkAliasCount, setLinkAliasCount] = useState(0);

  const [categoryError, setCategoryError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [visualAidError, setVisualAidError] = useState("");

  const [categoryIsNew, setCategoryIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Lucuberate | New Cube";
    if (!currentCategory) {
      setCategoryIsNew(true);
    } else {
      setCategoryIsNew(false);
    }
  }, [currentCategory]);

  const createCube = async formData => {
    const data = await CubeModel.create(formData);
    const userData = await UserModel.allCubesAndCategories(currentUserInfo._id);
    setCurrentUserInfo(userData);
    setIsLoading(false);
    setCurrentCubeId(data.cube._id);
    history.push(`/dashboard/${data.cube._id}`);
  };

  const collectCubeFormData = categoryId => {
    const formData = new FormData(document.getElementById("cube-new-form"));
    formData.append("user", currentUserInfo._id);
    formData.append("category", categoryId);
    !visualAidError && createCube(formData);
  };

  const checkFileExtention = e => {
    if (e.target.files.length === 0) {
      setVisualAid("");
      setVisualAidError("");
    } else {
      let ext = e.target.files[0].name.substr(
        e.target.files[0].name.lastIndexOf(".")
      );
      if (
        ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".png" ||
        ext === ".gif"
      ) {
        setVisualAid(e.target.files[0]);
        setVisualAidError("");
      } else {
        setVisualAid(e.target.files[0]);
        setVisualAidError("Only .jpg, .jpeg, .png, and .gif allowed");
      }
    }
  };

  const removeVisualAid = e => {
    e.preventDefault();
    visualAidInputRef.current.value = "";
    setVisualAid("");
    setVisualAidError("");
  };

  const createNewCategory = async () => {
    const newCategoryData = {
      title: newCategory,
      user: currentUserInfo._id,
    };
    const data = await CategoryModel.create(newCategoryData);
    const { _id: newCategoryId } = data;
    collectCubeFormData(newCategoryId);
  };

  const handleCategoryChange = e => {
    if (e.target.value === "New Category") {
      setCategoryIsNew(true);
      setCurrentCategory(null);
    } else {
      setCategoryIsNew(false);
      setCurrentCategory(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (question && answer) {
      if (categoryIsNew) {
        if (newCategory) {
          setIsLoading(true);
          createNewCategory();
        } else {
          setCategoryError("Required");
        }
      } else {
        setIsLoading(true);
        collectCubeFormData(currentCategory);
      }
    } else {
      !question && setQuestionError("Required");
      !answer && setAnswerError("Required");
      categoryIsNew && !newCategory && setCategoryError("Required");
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
  };
  const required = {
    color: "#ffc107",
    fontSize: "24px",
    lineHeight: "16px",
    verticalAlign: "bottom",
  };

  return (
    <div className="form-container container-column">
      <div className="instructions container-column theme-transition">
        <h1 className="form-title">
          <span className="force-line-break">Create a New&nbsp;</span>
          <span className="force-line-break">Study Cube</span>
        </h1>
        <h2 className="required-warning">
          <span className="force-line-break">
            &#40; Fields marked with&nbsp;
          </span>
          <span className="force-line-break">
            a <span style={required}>*</span> are required &#41;
          </span>
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="cube-new-form"
        className="cube-form">
        <div className="form-row">
          <div
            className={`form-group ${
              categoryIsNew ? "col-md-5" : "col-md-11"
            }`}>
            <label htmlFor="category-dropdown">
              Category&nbsp;<span style={required}>*</span>
              {categoryError && !categoryIsNew && !currentCategory && (
                <span style={errorStyle}>&nbsp;{`${categoryError}`}</span>
              )}
            </label>
            <div className="select-group">
              <select
                className="form-control theme-transition"
                id="category-dropdown"
                onChange={handleCategoryChange}
                value={
                  currentCategory
                    ? currentCategory
                    : categoryIsNew
                    ? "New Category"
                    : ""
                }>
                <option value="" disabled>
                  -- select an option --
                </option>
                <option value="New Category">New Category</option>
                {currentUserInfo?.categories?.map(category => (
                  <option
                    key={`${category._id}`}
                    value={`${category._id}`}>{`${category.title}`}</option>
                ))}
              </select>
              <div className="select-icon">
                <ChevronDownIcon size={16} />
              </div>
            </div>
          </div>
          {categoryIsNew && (
            <div className="form-group col-md-5">
              <label htmlFor="inputCategory">
                New Category&nbsp;<span style={required}>*</span>
                {categoryError && !newCategory && (
                  <span style={errorStyle}>&nbsp;{`${categoryError}`}</span>
                )}
              </label>
              <input
                type="text"
                className="form-control theme-transition"
                id="inputCategory"
                placeholder="Create a new category"
                maxLength="20"
                value={newCategory}
                onChange={e => {
                  setCategoryError("");
                  setNewCategory(e.target.value);
                  setNewCategoryCount(e.target.value.length);
                }}
              />
              <div className="character-count" style={{ float: "right" }}>
                <span className="currentCount">{newCategoryCount}</span>
                <span className="maxCount">/ 20</span>
              </div>
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputQuestion">
              Question&nbsp;<span style={required}>*</span>
              {questionError && !question && (
                <span style={errorStyle}>&nbsp;{`${questionError}`}</span>
              )}
            </label>
            <textarea
              type="text"
              className="form-control theme-transition"
              id="inputQuestion"
              placeholder="The quetsion goes here..."
              maxLength="300"
              name="question"
              value={question}
              onChange={e => {
                setQuestionError("");
                setQuestion(e.target.value);
                setQuestionCount(e.target.value.length);
              }}
            />
            <div className="character-count" style={{ float: "right" }}>
              <span className="currentCount">{questionCount}</span>
              <span className="maxCount">/ 300</span>
            </div>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="inputAnswer">
              Answer&nbsp;<span style={required}>*</span>
              {answerError && !answer && (
                <span style={errorStyle}>&nbsp;{`${answerError}`}</span>
              )}
            </label>
            <textarea
              type="text"
              className="form-control theme-transition"
              id="inputAnswer"
              placeholder="The answer goes here..."
              maxLength="300"
              name="answer"
              value={answer}
              onChange={e => {
                setAnswerError("");
                setAnswer(e.target.value);
                setAnswerCount(e.target.value.length);
              }}
            />
            <div className="character-count" style={{ float: "right" }}>
              <span className="currentCount">{answerCount}</span>
              <span className="maxCount">/ 300</span>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputHint">Hint</label>
            <textarea
              type="text"
              className="form-control theme-transition"
              id="inputHint"
              placeholder="Give yourself a nudge in the right direction."
              maxLength="300"
              name="hint"
              value={hint}
              onChange={e => {
                setHint(e.target.value);
                setHintCount(e.target.value.length);
              }}
            />
            <div className="character-count" style={{ float: "right" }}>
              <span className="currentCount">{hintCount}</span>
              <span className="maxCount">/ 300</span>
            </div>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="inputNotes">Notes</label>
            <textarea
              type="text"
              className="form-control theme-transition"
              id="inputNotes"
              placeholder="Anything to help with memorization..."
              maxLength="300"
              name="notes"
              value={notes}
              onChange={e => {
                setNotes(e.target.value);
                setNotesCount(e.target.value.length);
              }}
            />
            <div className="character-count" style={{ float: "right" }}>
              <span className="currentCount">{notesCount}</span>
              <span className="maxCount">/ 300</span>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className={link ? "form-group col-md-3" : "form-group col-md-5"}>
            <label htmlFor="inputLink">Resource Link</label>
            <input
              type="url"
              className="form-control theme-transition"
              id="inputLink"
              placeholder="Link to a resource."
              name="link"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>
          {link && (
            <div className="form-group col-md-3">
              <label htmlFor="inputAlias">
                Link Text&nbsp;&nbsp;
                <span
                  className="info-icon"
                  title="Use a descriptive phrase that provides context for the material you are linking to.">
                  <InfoIcon size={16} />
                </span>
              </label>
              <input
                type="text"
                className="form-control theme-transition"
                id="inputAlias"
                placeholder="ex. 'Article about education'"
                maxLength="50"
                name="link_alias"
                value={link_alias}
                onChange={e => {
                  setLinkAlias(e.target.value);
                  setLinkAliasCount(e.target.value.length);
                }}
              />
              <div className="character-count" style={{ float: "right" }}>
                <span className="currentCount">{linkAliasCount}</span>
                <span className="maxCount">/ 50</span>
              </div>
            </div>
          )}
          <div className={link ? "form-group col-md-3" : "form-group col-md-5"}>
            <div htmlFor="inputVisual">Visual Aid</div>
            <input
              ref={visualAidInputRef}
              type="file"
              className="form-control-file"
              id="inputVisual"
              placeholder="Choose file"
              name="visual_aid"
              onChange={checkFileExtention}
            />
            <label className="btn theme-transition" htmlFor="inputVisual">
              Upload
            </label>
            {visual_aid && visualAidError && (
              <div style={errorStyle}>{`${visualAidError}`}</div>
            )}
            {visual_aid ? (
              <>
                {visual_aid.name.length > 15 ? (
                  <span className="visual-aid-file-name">
                    {visual_aid.name.slice(0, 6)}&hellip;
                    {visual_aid.name.slice(-7)}{" "}
                  </span>
                ) : (
                  <span className="visual-aid-file-name">
                    {visual_aid.name}{" "}
                  </span>
                )}
                <button
                  className="delete-visual-aid"
                  type="button"
                  onClick={removeVisualAid}
                  title="Delete Visual Aid"
                  aria-label="Delete Visual Aid">
                  <XCircleFillIcon size={16} />
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="form-buttons form-row">
          <div className="form-group col-md-5"></div>
          <div className="form-group col-md-5">
            <Link tabIndex="-1" to="/dashboard">
              <button type="submit" className="btn form-btn btn-secondary">
                Cancel
              </button>
            </Link>
            <button
              disabled={
                questionError ||
                answerError ||
                categoryError ||
                visualAidError ||
                isLoading
                  ? true
                  : false
              }
              type="submit"
              className={`btn form-btn btn-primary ${
                isLoading ? "loading" : ""
              }`}>
              {isLoading ? (
                <PackageIcon size={24} className="loading-icon" />
              ) : (
                "Generate New Cube"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CubeNew;
