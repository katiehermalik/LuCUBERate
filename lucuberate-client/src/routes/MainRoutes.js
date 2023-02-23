import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  CurrentPathContext,
  LoadingContext,
  UserContext,
} from "../context/ContextProvider";
import RoutesWithNavbar from "./RoutesWithNavbar";
import Dashboard from "../pages/Dashboard";
import NewCube from "../pages/Dashboard/DashboardOutlets/NewCube";
import EditCube from "../pages/Dashboard/DashboardOutlets/EditCube";
import StudyCube from "../pages/Dashboard/DashboardOutlets/StudyCube";
import Instructions from "../pages/Dashboard/DashboardOutlets/Instructions";
import Landing from "../pages/Landing";
import App404 from "../pages/App404";
import Dashboard404 from "../pages/Dashboard/DashboardOutlets/Dashboard404";
import LoginSuccess from "../features/authentication/modals/LoginSuccess/component";

const MainRoutes = () => {
  const { currentPath } = useContext(CurrentPathContext);
  const { cubeIsLoading } = useContext(LoadingContext);
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {currentPath && (
        <>
          {isLoggedIn ? (
            <Routes>
              <Route
                index
                element={<RoutesWithNavbar component={<Landing />} />}
              />
              <Route
                path="/"
                element={<RoutesWithNavbar component={<Landing />} />}
              />
              <Route
                exact
                path="/dashboard"
                element={<RoutesWithNavbar component={<Dashboard />} />}>
                <Route
                  index
                  element={<Navigate to="/dashboard/instructions" replace />}
                />
                <Route path="instructions" element={<Instructions />} />
                <Route path="new" element={<NewCube />} />
                <Route
                  path="edit/:id"
                  element={
                    currentPath[0] !== "404" ? <EditCube /> : <Dashboard404 />
                  }
                />
                <Route
                  path="cube/:id"
                  element={
                    cubeIsLoading ? (
                      <StudyCube cubeIsLoading={cubeIsLoading} />
                    ) : currentPath[0] !== "404" ? (
                      <StudyCube />
                    ) : (
                      <Dashboard404 />
                    )
                  }
                />
              </Route>
              <Route path="*" element={<App404 />} />
            </Routes>
          ) : (
            <Routes>
              <Route
                index
                element={<RoutesWithNavbar component={<Landing />} />}
              />
              <Route
                path="/"
                element={<RoutesWithNavbar component={<Landing />} />}
              />
              <Route path="/login/success" element={<LoginSuccess />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

export default MainRoutes;
