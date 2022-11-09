import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { ThemeContext, UserContext } from "./context/ContextProvider";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import Dashboard from "./components/Dashboard";
import UnAuthRoutes from "./config/UnAuthRoutes";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUserInfo } = useContext(UserContext);

  return (
    <div
      className={`app theme-transition container-column ${
        theme === "dark" ? "dark" : "light"
      }`}>
      <Navbar user={currentUserInfo} />
      <UnAuthRoutes />
      {window.location.pathname !== "/" && <Dashboard user={currentUserInfo} />}
      <div className="mobile-only">
        <NavbarMobile user={currentUserInfo} />
      </div>
    </div>
  );
};

export default withRouter(App);
