import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ThemeContext,
  UserContext,
  DeleteModalContext,
} from "./context/ContextProvider";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CubeNew from "./pages/DashboardOutlets/CubeNew";
import CubeEdit from "./pages/DashboardOutlets/CubeEdit";
import CubeShow from "./pages/DashboardOutlets/CubeShow";
import Instructions from "./pages/DashboardOutlets/Instructions";
import DeleteModal from "./components/DeleteModal";
import Landing from "./pages/Landing";

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
      {currentUserInfo ? (
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={currentUserInfo} />}>
            <Route index element={<Instructions />} />
            <Route path="new" element={<CubeNew />} />
            <Route path=":id" element={<CubeShow />} />
            <Route path=":id/edit" element={<CubeEdit />} />
            {/* <Route path="/*" element={<Dashboard404 />}/> */}
          </Route>
          {/* <Route path="*" element={<404 />}/> */}
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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

export default App;
