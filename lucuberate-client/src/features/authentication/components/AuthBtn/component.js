import { useState } from "react";
import Login from "../../modals/LoginModal/component";
import SignUp from "../../modals/SignUpModal/component";

const AuthBtn = ({ authType }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenModal = e => {
    e.stopPropagation();
    if (authType === "Login") {
      setShowLoginModal(true);
    } else if (authType === "Sign Up") {
      setShowSignUpModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="btn navbar-item nav-link"
        aria-label={authType}>
        {authType}
      </button>
      <Login
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignUpModal={setShowSignUpModal}
      />
      <SignUp
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
        setShowLoginModal={setShowLoginModal}
      />
    </>
  );
};

export default AuthBtn;
