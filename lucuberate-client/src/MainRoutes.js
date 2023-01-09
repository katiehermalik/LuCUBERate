import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext, CurrentPathContext } from "./context/ContextProvider";
import RoutesWithNavbar from "./RoutesWithNavbar";
import Dashboard from "./pages/Dashboard";
import CubeNew from "./pages/DashboardOutlets/CubeNew";
import CubeEdit from "./pages/DashboardOutlets/CubeEdit";
import StudyCube from "./pages/DashboardOutlets/StudyCube";
import Instructions from "./pages/DashboardOutlets/Instructions";
import Landing from "./pages/Landing";
import App404 from "./pages/App404";
import Dashboard404 from "./pages/DashboardOutlets/Dashboard404";

const MainRoutes = () => {
  const { currentUserInfo, isLoggedIn } = useContext(UserContext);
  const { currentPath } = useContext(CurrentPathContext);

  return (
    <>
      {currentPath[0] && (
        <>
          {isLoggedIn ? (
            <Routes>
              <Route
                index
                element={
                  <RoutesWithNavbar
                    currentUserInfo={currentUserInfo}
                    component={<Landing />}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <RoutesWithNavbar
                    currentUserInfo={currentUserInfo}
                    component={<Landing />}
                  />
                }
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <RoutesWithNavbar
                    currentUserInfo={currentUserInfo}
                    component={<Dashboard user={currentUserInfo} />}
                  />
                }>
                <Route index element={<Instructions />} />
                <Route path="new" element={<CubeNew />} />
                {currentPath[0] !== "404" ? (
                  <>
                    <Route path=":id/edit" element={<CubeEdit />} />
                    <Route path=":id" element={<StudyCube />} />
                  </>
                ) : (
                  <>
                    <Route path=":id/edit" element={<Dashboard404 />} />
                    <Route path=":id" element={<Dashboard404 />} />
                  </>
                )}
              </Route>
              <Route path="*" element={<App404 />} />
            </Routes>
          ) : (
            <Routes>
              <Route
                index
                element={
                  <RoutesWithNavbar
                    currentUserInfo={currentUserInfo}
                    component={<Landing />}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <RoutesWithNavbar
                    currentUserInfo={currentUserInfo}
                    component={<Landing />}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

export default MainRoutes;
