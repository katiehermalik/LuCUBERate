import { useContext } from "react";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  DeleteContext,
} from "./context/ContextProvider";
import MainRoutes from "./routes/MainRoutes";
import DeleteModal from "./components/ConfirmationModal/component";
import Loading from "./components/Loading/component";

const App = () => {
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
      }`}>
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
