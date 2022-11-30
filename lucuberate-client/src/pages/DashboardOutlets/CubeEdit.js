import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  XCircleFillIcon,
  PackageIcon,
  InfoIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";

import CubeModel from "../../models/cube";
import UserModel from "../../models/user";
import CategoryModel from "../../models/category";
import {
  UserContext,
  CategoryContext,
  CubeContext,
  DeleteModalContext,
} from "../../context/ContextProvider";

const CubeEdit = () => {
  const navigate = useNavigate();
  const { id: cubeId } = useParams();
  const { currentUserInfo, setCurrentUserInfo } = useContext(UserContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);

  const visualAidInputRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [notes, setNotes] = useState("");
  const [link_1, setLinkOne] = useState("");
  const [link_alias_1, setLinkAliasOne] = useState("");
  const [visual_aid, setVisualAid] = useState("");
  const [new_visual_aid, setNewVisualAid] = useState("");
  const [removingVisualAid, setRemovingVisualAid] = useState(false);

  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [linkAliasCount, setLinkAliasCount] = useState(0);

  const [categoryError, setCategoryError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [visualAidError, setVisualAidError] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryCount, setNewCategoryCount] = useState(0);
  const [categoryIsNew, setCategoryIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCubeCategory, setCurrentCubeCategory] = useState({});
  const { setDeleteModalInfo } = useContext(DeleteModalContext);

  const updateCube = async formData => {
    await CubeModel.update(formData, cubeId);
    const userData = await UserModel.allCubesAndCategories(currentUserInfo._id);
    setCurrentUserInfo(userData);
    setIsLoading(false);
    navigate(`/dashboard/${cubeId}`);
  };

  useEffect(() => {
    document.title = "Lucuberate | Edit Cube";
    (async function () {
      const data = await CubeModel.getOne(cubeId);
      setQuestion(data.cube.question);
      setAnswer(data.cube.answer);
      setHint(data.cube.hint);
      setNotes(data.cube.notes);
      setLinkOne(data.cube.link_1);
      setLinkAliasOne(data.cube.link_alias_1);
      setVisualAid(data.cube.visual_aid_url);
      setQuestionCount(data.cube.question.length);
      setAnswerCount(data.cube.answer.length);
      setHintCount(data.cube.hint.length);
      setNotesCount(data.cube.notes.length);
      setLinkAliasCount(data.cube.link_alias_1.length);
    })();

    const currentCubeCatInfo = currentUserInfo?.categories.find(category =>
      category.cubes.includes(currentCubeId)
    );
    setCurrentCubeCategory(currentCubeCatInfo);
    currentCategory === null ? setCategoryIsNew(true) : setCategoryIsNew(false);
  }, [
    cubeId,
    currentCategory,
    new_visual_aid,
    categoryIsNew,
    currentUserInfo,
    currentCubeCategory,
    currentCubeId,
  ]);

  const collectCubeFormData = categoryId => {
    const formData = new FormData(document.getElementById("cube-edit-form"));
    formData.append("user", currentUserInfo._id);
    formData.append("category", categoryId);
    formData.append("removingVisualAid", removingVisualAid);
    !visualAidError && updateCube(formData);
  };

  const checkFileExtention = e => {
    if (e.target.files.length === 0) {
      setNewVisualAid("");
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
        setNewVisualAid(e.target.files[0]);
        setVisualAidError("");
      } else {
        setNewVisualAid(e.target.files[0]);
        setVisualAidError("Only .jpg, .jpeg, .png, and .gif allowed");
      }
    }
  };

  const removeVisualAid = e => {
    e.preventDefault();
    visualAidInputRef.current.value = "";
    setNewVisualAid("");
    setVisualAidError("");
    setRemovingVisualAid(false);
  };

  const removeSavedVisualAid = e => {
    e.preventDefault();
    visualAidInputRef.current.value = null;
    setNewVisualAid("");
    setVisualAid("");
    setVisualAidError("");
    setRemovingVisualAid(true);
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
          currentCategory !== currentCubeCategory._id &&
          currentCubeCategory.cubes.length === 1
            ? setDeleteModalInfo({
                showModal: true,
                type: "warning",
                cubeId: cubeId || "",
                newCategory: newCategory || "",
                categoryIsNew: categoryIsNew || false,
                currentCategory: currentCategory || "",
                categoryTitle: currentCubeCategory.title || "",
                setIsLoading: setIsLoading || null,
                createNewCategory: createNewCategory || null,
                collectCubeFormData: collectCubeFormData || null,
              })
            : createNewCategory();
        } else {
          setCategoryError("Required");
        }
      } else {
        setIsLoading(true);
        currentCategory !== currentCubeCategory._id &&
        currentCubeCategory.cubes.length === 1
          ? setDeleteModalInfo({
              showModal: true,
              type: "warning",
              cubeId: cubeId || "",
              newCategory: newCategory || "",
              categoryIsNew: categoryIsNew || false,
              currentCategory: currentCategory || "",
              categoryTitle: currentCubeCategory.title || "",
              setIsLoading: setIsLoading || null,
              createNewCategory: createNewCategory || null,
              collectCubeFormData: collectCubeFormData || null,
            })
          : collectCubeFormData(currentCategory);
      }
    } else {
      !question && setQuestionError("Required");
      !answer && setAnswerError("Required");
      categoryIsNew && !newCategory && setCategoryError("Required");
    }
  };

  const handleCancelClick = e => {
    setCurrentCategory(currentCubeCategory._id);
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
    <>
      <div className="form-container container-column">
        <div className="instructions container-column theme-transition">
          <h1 className="form-title">
            <span className="force-line-break">Edit this&nbsp;</span>
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
          id="cube-edit-form"
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
                    {" "}
                    -- select an option --{" "}
                  </option>
                  <option value="New Category">New Category</option>
                  {currentUserInfo?.categories?.map(category => (
                    <option
                      key={`${category._id}`}
                      value={`${category._id}`}>{`${category.title}`}</option>
                  ))}
                </select>
                <div className="select-icon theme-transition">
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
                value={hint || ""}
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
                value={notes || ""}
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
            {/* TODO - validate url using URL Constructor */}
            <div
              className={
                link_1 ? "form-group col-md-3" : "form-group col-md-5"
              }>
              <label htmlFor="inputLink">Resource Link</label>
              <input
                type="url"
                className="form-control theme-transition"
                id="inputLink"
                placeholder="Link to a resource."
                name="link_1"
                value={link_1 || ""}
                onChange={e => setLinkOne(e.target.value)}
              />
            </div>
            {/* TODO - add multiple resource links functionality */}
            {link_1 && (
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
                  name="link_alias_1"
                  value={link_alias_1 || ""}
                  onChange={e => {
                    setLinkAliasOne(e.target.value);
                    setLinkAliasCount(e.target.value.length);
                  }}
                />
                <div className="character-count" style={{ float: "right" }}>
                  <span className="currentCount">{linkAliasCount}</span>
                  <span className="maxCount">/ 50</span>
                </div>
              </div>
            )}

            <div
              className={
                link_1 ? "form-group col-md-3" : "form-group col-md-5"
              }>
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
                {visual_aid ? "Upload New" : "Upload"}
              </label>
              {new_visual_aid && visualAidError && (
                <div style={errorStyle}>{`${visualAidError}`}</div>
              )}
              {new_visual_aid ? (
                <>
                  {new_visual_aid.name.length > 15 ? (
                    <span className="visual-aid-file-name">
                      {new_visual_aid.name.slice(0, 6)}&hellip;
                      {new_visual_aid.name.slice(-7)}{" "}
                    </span>
                  ) : (
                    <span className="visual-aid-file-name">
                      {new_visual_aid.name}{" "}
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
              ) : visual_aid ? (
                <div className="visual-aid-preview-container">
                  <img
                    src={visual_aid}
                    alt="visual aid"
                    className="visual-aid-preview"
                  />
                  <button
                    className="delete-saved-visual-aid"
                    type="button"
                    onClick={removeSavedVisualAid}
                    title="Delete Visual Aid"
                    aria-label="Delete Visual Aid">
                    <XCircleFillIcon size={24} />
                  </button>
                </div>
              ) : null}
              {/* TODO - compress visual aid size */}
              {/* TODO - make sure visual aid is deleted from AWS S3 Bucket */}
            </div>
          </div>
          <div className="form-buttons form-row">
            <div className="form-group col-md-5"></div>
            <div className="form-group col-md-5">
              <Link tabIndex="-1" to={`/dashboard/${cubeId}`}>
                <button
                  type="submit"
                  className="btn form-btn btn-secondary"
                  onClick={handleCancelClick}>
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
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CubeEdit;
