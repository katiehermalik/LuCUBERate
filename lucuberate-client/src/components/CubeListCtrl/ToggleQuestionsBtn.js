import { useContext } from 'react';
import { QuestionsContext } from '../../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ToggleQuestionsBtn = () => {
  const { questionsAreVisible, setQuestionsAreVisible } = useContext(QuestionsContext);

  const toggleQuestions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuestionsAreVisible(prevState => {
      return !prevState;
    });
  }

  return <button 
      className="button header-btns btn-ctrl"
      type="button"
      onClick={toggleQuestions}
      title={questionsAreVisible ? "Hide Questions" : "Show Questions"}
      aria-label={questionsAreVisible ? "Hide Questions" : "Show Questions"} >
        <i className="prefix grey-text"><FontAwesomeIcon icon={questionsAreVisible ? faEyeSlash : faEye} /></i>
    <br/>{questionsAreVisible ? "Hide Questions" : "Show Questions"}</button>
}

export default ToggleQuestionsBtn;