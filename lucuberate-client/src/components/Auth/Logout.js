import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";
import {
  UserContext,
  ThemeContext,
  CategoryContext,
  CubeContext,
  QuestionsContext,
  CategoryListContext,
} from "../../context/ContextProvider";

const Logout = ({ setShowUserMenu }) => {
  const navigate = useNavigate();
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setTheme } = useContext(ThemeContext);
  const { setCurrentCategory } = useContext(CategoryContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setQuestionsAreVisible } = useContext(QuestionsContext);
  const { setShowCategoryList } = useContext(CategoryListContext);

  const handleSubmit = e => {
    setTheme("dark");
    setCurrentUserInfo(null);
    setCurrentCategory(null);
    setCurrentCubeId(null);
    setQuestionsAreVisible(false);
    setShowCategoryList(true);
    setShowUserMenu(false);
    sessionStorage.clear();
    navigate("/");
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

export default Logout;
