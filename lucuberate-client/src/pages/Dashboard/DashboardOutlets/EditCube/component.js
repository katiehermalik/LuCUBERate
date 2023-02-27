import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  XCircleFillIcon,
  PackageIcon,
  InfoIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";
import {
  CurrentPathContext,
  LoadingContext,
  UserContext,
  DeleteContext,
  CategoryContext,
  CubeContext,
} from "../../../../context/ContextProvider";
import CubeAPI from "../../../../utils/api/cube";
import CategoryAPI from "../../../../utils/api/category";

const EditCube = () => {
  const navigate = useNavigate();
  const { id: cubeId } = useParams();
  const { cubeData } = useContext(CurrentPathContext);
  const { setCubeIsLoading } = useContext(LoadingContext);
  const { currentUserInfo, setUserInfoIsUpdating } = useContext(UserContext);
  const { setDeleteModalInfo } = useContext(DeleteContext);
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const { currentCubeId } = useContext(CubeContext);

  const visualAidInputRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [notes, setNotes] = useState("");
  const [link_1, setLinkOne] = useState({});
  // const [link_alias_1, setLinkAliasOne] = useState("");
  const [link_2, setLinkTwo] = useState({});
  // const [link_alias_2, setLinkAliasTwo] = useState("");
  const [link_3, setLinkThree] = useState({});
  // const [link_alias_3, setLinkAliasThree] = useState("");
  const [visual_aid, setVisualAid] = useState("");
  const [new_visual_aid, setNewVisualAid] = useState("");
  const [removingVisualAid, setRemovingVisualAid] = useState(false);
  const [linksAmount, setLinksAmount] = useState(1);

  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [linkAliasOneCount, setLinkAliasOneCount] = useState(0);
  const [linkAliasTwoCount, setLinkAliasTwoCount] = useState(0);
  const [linkAliasThreeCount, setLinkAliasThreeCount] = useState(0);

  const [categoryError, setCategoryError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [visualAidError, setVisualAidError] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryCount, setNewCategoryCount] = useState(0);
  const [categoryIsNew, setCategoryIsNew] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [currentCubeCategory, setCurrentCubeCategory] = useState({});

  const updateCube = async formData => {
    await CubeAPI.update(formData, cubeId);
    setUserInfoIsUpdating(true);
    setCubeIsLoading(true);
    setIsLoadingButton(false);
    navigate(`/dashboard/cube/${cubeId}`);
  };

  useEffect(() => {
    document.title = "Lucuberate | Edit Cube";
    console.log(cubeData.cube);
    if (cubeData.cube) {
      const {
        cube: {
          question,
          answer,
          hint,
          notes,
          link_1,
          // link_alias_1,
          link_2,
          // link_alias_2,
          link_3,
          // link_alias_3,
          visual_aid_url,
        },
      } = cubeData;
      setQuestion(question);
      setAnswer(answer);
      setHint(hint);
      setNotes(notes);
      setLinkOne(link_1);
      setLinkTwo(link_2);
      setLinkThree(link_3);
      // setLinkAliasOne(link_alias_1);
      // setLinkAliasTwo(link_alias_2);
      // setLinkAliasThree(link_alias_3);
      setVisualAid(visual_aid_url);
      setQuestionCount(question.length);
      setAnswerCount(answer.length);
      setHintCount(hint.length);
      setNotesCount(notes.length);
      setLinkAliasOneCount(link_1.alias.length);
      setLinkAliasTwoCount(link_2.alias.length);
      setLinkAliasThreeCount(link_3.alias.length);
      const linksArray = [link_1, link_2, link_3];
      const actualLinks = linksArray.filter(link => link.url !== "");
      setLinksAmount(actualLinks.length);

      const currentCubeCatInfo = currentUserInfo?.categories.find(category =>
        category.cubes.includes(currentCubeId)
      );
      setCurrentCubeCategory(currentCubeCatInfo);
      currentCategory === null
        ? setCategoryIsNew(true)
        : setCategoryIsNew(false);
    } else {
      navigate(`/dashboard/cube/${cubeId}`);
    }
  }, [
    cubeId,
    currentCategory,
    new_visual_aid,
    categoryIsNew,
    currentUserInfo,
    currentCubeCategory,
    currentCubeId,
    navigate,
    cubeData,
  ]);

  const collectCubeFormData = categoryId => {
    const links = [link_1, link_2, link_3].filter(link => link.url !== "");
    console.log({ links });
    const formData = new FormData(document.getElementById("cube-edit-form"));
    formData.set("link_1", JSON.stringify(links[0]));
    formData.set("link_2", JSON.stringify(links[1]));
    formData.set("link_3", JSON.stringify(links[2]));
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
    const data = await CategoryAPI.create(newCategoryData);
    const { _id: newCategoryId } = data;
    collectCubeFormData(newCategoryId);
  };

  const handleCategoryChange = e => {
    if (e.target.value === "New Category") {
      setCategoryIsNew(true);
      setCurrentCategory(null);
    } else {
      setCategoryIsNew(false);
      setCategoryError("");
      setCurrentCategory(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (question && answer) {
      if (categoryIsNew) {
        if (newCategory) {
          setIsLoadingButton(true);
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
                setIsLoadingButton: setIsLoadingButton || null,
                createNewCategory: createNewCategory || null,
                collectCubeFormData: collectCubeFormData || null,
              })
            : createNewCategory();
        } else {
          setCategoryError("Required");
        }
      } else {
        setIsLoadingButton(true);
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
              setIsLoadingButton: setIsLoadingButton || null,
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
      {console.log(linksAmount)}
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
                categoryIsNew ? "columns-2" : "columns-1"
              }`}>
              <label htmlFor="category-dropdown">
                Category&nbsp;<span style={required}>*</span>
                {categoryError && !categoryIsNew && !currentCategory && (
                  <span style={errorStyle}>&nbsp;{`${categoryError}`}</span>
                )}
              </label>
              <div className="select-group">
                <select
                  className="form-control"
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
                <div className="dropdown-chevron-icon">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            {categoryIsNew && (
              <div className="form-group columns-2">
                <label htmlFor="inputCategory">
                  New Category&nbsp;<span style={required}>*</span>
                  {categoryError && !newCategory && (
                    <span style={errorStyle}>&nbsp;{`${categoryError}`}</span>
                  )}
                </label>
                <input
                  type="text"
                  className="form-control"
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
            <div className="form-group columns-2">
              <label htmlFor="inputQuestion">
                Question&nbsp;<span style={required}>*</span>
                {questionError && !question && (
                  <span style={errorStyle}>&nbsp;{`${questionError}`}</span>
                )}
              </label>
              <textarea
                type="text"
                className="form-control"
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
            <div className="form-group columns-2">
              <label htmlFor="inputAnswer">
                Answer&nbsp;<span style={required}>*</span>
                {answerError && !answer && (
                  <span style={errorStyle}>&nbsp;{`${answerError}`}</span>
                )}
              </label>
              <textarea
                type="text"
                className="form-control"
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
            <div className="form-group columns-2">
              <label htmlFor="inputHint">Hint</label>
              <textarea
                type="text"
                className="form-control"
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
            <div className="form-group columns-2">
              <label htmlFor="inputNotes">Notes</label>
              <textarea
                type="text"
                className="form-control"
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

            <div className="form-group columns-2">
              <div className="form-group columns-2 resource-group">
                <div
                  className={
                    link_1.url ? "form-group columns-2" : "form-group columns-1"
                  }>
                  <label htmlFor="inputLink">Resource Link 1</label>
                  <input
                    type="url"
                    className="form-control"
                    id="inputLink"
                    placeholder="Link to a resource."
                    name="link_1"
                    value={link_1.url || ""}
                    onChange={e =>
                      setLinkOne(prevState => ({
                        alias: e.target.value === "" ? "" : prevState.alias,
                        url: e.target.value,
                      }))
                    }
                  />
                  {linksAmount === 1 && (
                    <button
                      onClick={() => setLinksAmount(prevState => prevState + 1)}
                      className="add-resource">
                      + add another link
                    </button>
                  )}
                </div>
                {/* TODO - add multiple resource links functionality */}
                {link_1.url && (
                  <div className="form-group columns-2">
                    <label htmlFor="inputAlias">
                      Link 1 Text&nbsp;&nbsp;
                      <span
                        className="info-icon"
                        title="Use a descriptive phrase that provides context for the material you are linking to.">
                        <InfoIcon size={16} />
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAlias"
                      placeholder="ex. 'Article about ...'"
                      maxLength="50"
                      name="link_alias_1"
                      value={link_1.alias || ""}
                      onChange={e => {
                        setLinkOne(prevState => ({
                          ...prevState,
                          alias: e.target.value,
                        }));
                        setLinkAliasOneCount(e.target.value.length);
                      }}
                    />
                    <div className="character-count" style={{ float: "right" }}>
                      <span className="currentCount">{linkAliasOneCount}</span>
                      <span className="maxCount">/ 50</span>
                    </div>
                  </div>
                )}
              </div>
              {linksAmount >= 2 && (
                <div className="form-group columns-2 resource-group">
                  <div
                    className={
                      link_2.url
                        ? "form-group columns-2"
                        : "form-group columns-1"
                    }>
                    <label htmlFor="inputLink">Resource Link 2</label>
                    <input
                      type="url"
                      className="form-control"
                      id="inputLink"
                      placeholder="Link to a resource."
                      name="link_2"
                      value={link_2.url || ""}
                      onChange={e =>
                        setLinkTwo(prevState => ({
                          alias: e.target.value === "" ? "" : prevState.alias,
                          url: e.target.value,
                        }))
                      }
                    />
                    {linksAmount === 2 && (
                      <button
                        onClick={() =>
                          setLinksAmount(prevState => prevState + 1)
                        }
                        className="add-resource">
                        + add another link
                      </button>
                    )}
                  </div>
                  {/* TODO - add multiple resource links functionality */}
                  {link_2.url && (
                    <div className="form-group columns-2">
                      <label htmlFor="inputAlias">
                        Link 2 Text&nbsp;&nbsp;
                        <span
                          className="info-icon"
                          title="Use a descriptive phrase that provides context for the material you are linking to.">
                          <InfoIcon size={16} />
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAlias"
                        placeholder="ex. 'Article about ...'"
                        maxLength="50"
                        name="link_alias_2"
                        value={link_2.alias || ""}
                        onChange={e => {
                          setLinkTwo(prevState => ({
                            ...prevState,
                            alias: e.target.value,
                          }));
                          setLinkAliasTwoCount(e.target.value.length);
                        }}
                      />
                      <div
                        className="character-count"
                        style={{ float: "right" }}>
                        <span className="currentCount">
                          {linkAliasTwoCount}
                        </span>
                        <span className="maxCount">/ 50</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {linksAmount === 3 && (
                <div className="form-group columns-2 resource-group">
                  <div
                    className={
                      link_3.url
                        ? "form-group columns-2"
                        : "form-group columns-1"
                    }>
                    <label htmlFor="inputLink">Resource Link 3</label>
                    <input
                      type="url"
                      className="form-control"
                      id="inputLink"
                      placeholder="Link to a resource."
                      name="link_3"
                      value={link_3.url || ""}
                      onChange={e => {
                        setLinkThree(prevState => ({
                          alias: e.target.value === "" ? "" : prevState.alias,
                          url: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  {/* TODO - add multiple resource links functionality */}
                  {link_3.url && (
                    <div className="form-group columns-2">
                      <label htmlFor="inputAlias">
                        Link 3 Text&nbsp;&nbsp;
                        <span
                          className="info-icon"
                          title="Use a descriptive phrase that provides context for the material you are linking to.">
                          <InfoIcon size={16} />
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAlias"
                        placeholder="ex. 'Article about ...'"
                        maxLength="50"
                        name="link_alias_3"
                        value={link_3.alias || ""}
                        onChange={e => {
                          setLinkThree(prevState => ({
                            ...prevState,
                            alias: e.target.value,
                          }));
                          setLinkAliasThreeCount(e.target.value.length);
                        }}
                      />
                      <div
                        className="character-count"
                        style={{ float: "right" }}>
                        <span className="currentCount">
                          {linkAliasThreeCount}
                        </span>
                        <span className="maxCount">/ 50</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="form-group columns-2">
              <div htmlFor="inputVisual">Visual Aid</div>
              <input
                ref={visualAidInputRef}
                type="file"
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
            </div>
          </div>
          <div className="form-buttons form-row">
            <div className="form-group columns-2"></div>
            <div className="form-group columns-2">
              <Link tabIndex="-1" to={`/dashboard/cube/${cubeId}`}>
                <button
                  type="submit"
                  className="btn form-btn btn-secondary"
                  onClick={() => setCurrentCategory(currentCubeCategory._id)}>
                  Cancel
                </button>
              </Link>
              <button
                disabled={
                  questionError ||
                  answerError ||
                  categoryError ||
                  visualAidError ||
                  isLoadingButton
                    ? true
                    : false
                }
                type="submit"
                className={`btn form-btn btn-primary ${
                  isLoadingButton ? "loading" : ""
                }`}>
                {isLoadingButton ? (
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

export default EditCube;
