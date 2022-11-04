import { withRouter } from "react-router-dom";
import Login from "./Login";

const LoginBtn = ({
  auth,
  showLoginModal,
  setShowLoginModal,
  setShowSignUpModal,
}) => {
  const handleOpenModal = e => {
    e.stopPropagation();
    setShowLoginModal(true);
    console.log("opening login modal");
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
        auth={auth}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    </>
  );
};

export default withRouter(LoginBtn);
