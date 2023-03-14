import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShieldIcon } from "@primer/octicons-react";
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
import UserAPI from "./utils/api/user";

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
  const [message, setMessage] = useState(null);
  const { messageDisplayed } =
    JSON.parse(sessionStorage.getItem("message")) || "";

  useEffect(() => {
    if (!messageDisplayed) {
      (async () => {
        const userInfo = await UserAPI.userData();
        const {
          session: { messages },
        } = userInfo;
        if (messages)
          setMessage(() => {
            sessionStorage.setItem(
              "message",
              JSON.stringify({
                messageDisplayed: true,
              })
            );
            return messages[0];
          });
      })();
    }
  }, [messageDisplayed]);

  return (
    <>
      {message && (
        <div className="message-banner">
          <ShieldIcon className="shield-icon" size={24} />
          <div className="message">
            {message}{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:support@lucuberate.com">
              <b>support@lucuberate.com</b>
            </a>
          </div>
          <button
            onClick={() => {
              setMessage(null);
            }}
            type="button"
            className="close"
            aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
      <div
        className={`app container-column ${
          theme === "dark" ? "dark" : "light"
        }`}
        style={{
          height: `${pathname === "/" ? "" : "100%"}`,
          overflowY: `${pathname === "/" ? "" : "hidden"}`,
          position: `${pathname === "/" ? "" : "fixed"}`,
          width: `${pathname === "/" ? "" : "100%"}`,
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
    </>
  );
};

export default App;
