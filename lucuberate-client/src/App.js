import { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  DeleteContext,
  AuthModalContext,
} from "./context/ContextProvider";
import MainRoutes from "./routes/MainRoutes";
import DeleteModal from "./components/ConfirmationModal";
import LoginModal from "./features/authentication/modals/LoginModal/component";
import SignUpModal from "./features/authentication/modals/SignUpModal/component";
import Loading from "./components/Loading";

const App = () => {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { appIsLoading } = useContext(LoadingContext);
  const { isLoggedIn } = useContext(UserContext);
  const {
    deleteModalInfo,
    deleteModalInfo: { showDeleteModal },
    setDeleteModalInfo,
  } = useContext(DeleteContext);
  const {
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
  } = useContext(AuthModalContext);

  return (
    <div
      className={`app theme-transition container-column ${
        theme === "dark" ? "dark" : "light"
      }`}
      style={{
        height: `${pathname === "/" ? "" : "100%"}`,
        overflowY: `${pathname === "/" ? "" : "hidden"}`,
      }}>
      {isLoggedIn && appIsLoading ? (
        <Loading />
      ) : (
        <>
          <MainRoutes />
          {showDeleteModal && (
            <DeleteModal
              setDeleteModalInfo={setDeleteModalInfo}
              deleteModalInfo={deleteModalInfo}
            />
          )}
          {showLoginModal && (
            <LoginModal
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              setShowSignUpModal={setShowSignUpModal}
            />
          )}
          {showSignUpModal && (
            <SignUpModal
              showSignUpModal={showSignUpModal}
              setShowSignUpModal={setShowSignUpModal}
              setShowLoginModal={setShowLoginModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
