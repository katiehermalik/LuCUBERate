import Login from "../../modals/Login/component";

const LoginBtn = ({
  showLoginModal,
  setShowLoginModal,
  setShowSignUpModal,
}) => {
  const handleOpenModal = e => {
    e.stopPropagation();
    setShowLoginModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="btn navbar-item nav-link"
        aria-label="login">
        Login
      </button>
      <Login
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    </>
  );
};

export default LoginBtn;
