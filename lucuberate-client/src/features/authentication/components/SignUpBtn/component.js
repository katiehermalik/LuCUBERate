import SignUp from "../../modals/SignUp/component";

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

export default SignUpBtn;
