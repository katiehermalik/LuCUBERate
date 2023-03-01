import { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  DeleteContext,
} from "./context/ContextProvider";
import MainRoutes from "./routes/MainRoutes";
import DeleteModal from "./components/ConfirmationModal";
import Loading from "./components/Loading";

const App = () => {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { appIsLoading } = useContext(LoadingContext);
  const { isLoggedIn } = useContext(UserContext);
  const {
    deleteModalInfo,
    deleteModalInfo: { showModal },
    setDeleteModalInfo,
  } = useContext(DeleteContext);

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
          {showModal && (
            <DeleteModal
              setDeleteModalInfo={setDeleteModalInfo}
              deleteModalInfo={deleteModalInfo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
