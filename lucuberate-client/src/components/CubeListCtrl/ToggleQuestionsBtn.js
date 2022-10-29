import { useContext } from "react";
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
      className="button header-btns btn-ctrl"
      type="button"
      onClick={toggleQuestions}
      aria-label={questionsAreVisible ? "Hide Questions" : "Show Questions"}>
      {questionsAreVisible ? "Hide Questions" : "Show Questions"}
    </button>
  );
};

export default ToggleQuestionsBtn;
