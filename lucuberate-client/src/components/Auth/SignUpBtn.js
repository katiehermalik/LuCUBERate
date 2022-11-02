import { withRouter } from "react-router-dom";
import SignUp from "./SignUp";

const SignUpBtn = ({
  auth,
  showSignUpModal,
  setShowSignUpModal,
  setShowLoginModal,
}) => {
  const handleOpenModal = e => {
    e.stopPropagation();
    setShowSignUpModal(true);
    console.log("opening sign up modal");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="btn nav-item navbar-item nav-link"
        aria-label="sign up">
        Sign Up
      </button>
      <SignUp
        auth={auth}
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
};

export default withRouter(SignUpBtn);
