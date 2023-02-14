import { useContext } from "react";
import { SignOutIcon } from "@primer/octicons-react";
import {
  UserContext,
  ThemeContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
  CategoryListContext,
} from "../../../../context/ContextProvider";
import AuthAPI from "../../../../utils/api/auth";

const LogoutBtn = ({ setShowUserMenu }) => {
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setTheme } = useContext(ThemeContext);
  const { setCurrentCategory } = useContext(CategoryContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setQuestionsAreVisible } = useContext(QuestionsContext);
  const { setShowSidePanel } = useContext(CategoryListContext);

  const handleSubmit = async e => {
    const data = await AuthAPI.logout();
    setTheme("dark");
    setCurrentUserInfo(data.user);
    setCurrentCategory(null);
    setCurrentCubeId(null);
    setQuestionsAreVisible(false);
    setShowSidePanel(true);
    setShowUserMenu(false);
    sessionStorage.clear();
    localStorage.clear();
  };

  return (
    <button
      onClick={handleSubmit}
      className="btn navbar-item logout-btn theme-transition"
      type="submit"
      title="log out">
      Log Out&ensp;
      <SignOutIcon size={16} />
    </button>
  );
};

export default LogoutBtn;
