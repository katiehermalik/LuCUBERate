import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";
import {
  UserContext,
  ThemeContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
  LayoutContext,
  // CurrentPathContext,
} from "../../../../context/ContextProvider";
import AuthAPI from "../../../../utils/api/auth";

const LogoutBtn = ({ setShowUserMenu }) => {
  const navigate = useNavigate();
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setTheme } = useContext(ThemeContext);
  const { setCurrentCategory } = useContext(CategoryContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setQuestionsAreVisible } = useContext(QuestionsContext);
  const { setShowSidePanel } = useContext(LayoutContext);
  // const { setCurrentPath } = useContext(CurrentPathContext);

  const handleSubmit = async e => {
    const data = await AuthAPI.logout();
    // setCurrentPath(["home", null]);
    setTheme("dark");
    setCurrentUserInfo(data.user);
    setCurrentCategory(null);
    setCurrentCubeId(null);
    setQuestionsAreVisible(false);
    setShowSidePanel(true);
    setShowUserMenu(false);
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      onClick={handleSubmit}
      className="btn navbar-item logout-btn"
      type="submit"
      title="log out">
      Log Out&ensp;
      <SignOutIcon size={16} />
    </button>
  );
};

export default LogoutBtn;
