import { useContext } from "react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";
import { QuestionsContext } from "../../context/ContextProvider";

const ToggleQuestionsBtn = () => {
  const { questionsAreVisible, setQuestionsAreVisible } =
    useContext(QuestionsContext);

  const toggleQuestions = e => {
    e.preventDefault();
    e.stopPropagation();
    setQuestionsAreVisible(prevState => {
      return !prevState;
    });
  };

  return (
    <button
      className="btn select-action-btn category-action-btn theme-transition"
      type="button"
      onClick={toggleQuestions}
      title={questionsAreVisible ? "Hide Questions" : "Show Questions"}
      aria-label={questionsAreVisible ? "Hide Questions" : "Show Questions"}>
      {questionsAreVisible ? (
        <EyeIcon size={16} />
      ) : (
        <EyeClosedIcon size={16} />
      )}
    </button>
  );
};

export default ToggleQuestionsBtn;
