import { useContext } from "react";
import {
  ThemeContext,
  UserContext,
  DeleteModalContext,
  CurrentPathContext,
} from "./context/ContextProvider";
import MainRoutes from "./routes/MainRoutes";
import DeleteModal from "./components/ConfirmationModal/component";
import Loading from "./components/Loading/component";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, isLoading } = useContext(UserContext);
  const {
    deleteModalInfo,
    deleteModalInfo: { showModal },
    setDeleteModalInfo,
  } = useContext(DeleteModalContext);
  const { currentPath } = useContext(CurrentPathContext);

  console.log({ currentPath });

  return (
    <div
      className={`app theme-transition container-column ${
        theme === "dark" ? "dark" : "light"
      }`}>
      {isLoggedIn && isLoading ? (
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
