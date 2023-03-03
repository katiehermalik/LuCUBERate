import { useContext } from "react";
import { AuthModalContext } from "../../../../context/ContextProvider";
import "./style.css";

const AuthBtn = ({ authType }) => {
  const { setShowLoginModal, setShowSignUpModal } =
    useContext(AuthModalContext);

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
        className={`btn navbar-item ${
          authType === "Sign Up" ? "sign-up-btn" : ""
        }`}
        aria-label={authType}>
        {authType}
      </button>
    </>
  );
};

export default AuthBtn;
