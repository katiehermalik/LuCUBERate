import { useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  ThemeContext,
  UserContext,
  DeleteModalContext,
} from "./context/ContextProvider";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import Dashboard from "./components/Dashboard";
import UnAuthRoutes from "./config/UnAuthRoutes";
import DeleteModal from "./components/DeleteModal";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUserInfo } = useContext(UserContext);
  const { deleteModalInfo, setDeleteModalInfo } =
    useContext(DeleteModalContext);

  return (
    <div
      className={`app theme-transition container-column ${
        theme === "dark" ? "dark" : "light"
      }`}>
      <Navbar user={currentUserInfo} />
      <UnAuthRoutes />
      {window.location.pathname !== "/" && (
        <>
          <Dashboard user={currentUserInfo} />
          <div className="mobile-only-nav">
            <NavbarMobile user={currentUserInfo} />
          </div>
        </>
      )}
      {deleteModalInfo.showModal && (
        <DeleteModal
          setDeleteModalInfo={setDeleteModalInfo}
          deleteModalInfo={deleteModalInfo}
        />
      )}
    </div>
  );
};

export default withRouter(App);
