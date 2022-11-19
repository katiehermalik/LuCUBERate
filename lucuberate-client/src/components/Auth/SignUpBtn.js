import { withRouter } from "react-router-dom";
import SignUp from "./SignUp";

const SignUpBtn = ({
  showSignUpModal,
  setShowSignUpModal,
  setShowLoginModal,
}) => {
  const handleOpenModal = e => {
    e.stopPropagation();
    setShowSignUpModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="btn navbar-item nav-link"
        aria-label="sign up">
        Sign Up
      </button>
      <SignUp
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
};

export default withRouter(SignUpBtn);
