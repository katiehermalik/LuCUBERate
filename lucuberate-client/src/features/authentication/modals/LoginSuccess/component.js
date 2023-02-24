import { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  GuideContext,
  LayoutContext,
} from "../../../../context/ContextProvider";
import UserAPI from "../../../../utils/api/user";
import "./style.css";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setTheme } = useContext(ThemeContext);
  const { setAppIsLoading } = useContext(LoadingContext);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowSidePanel } = useContext(LayoutContext);

  const fetchOAuthUser = useCallback(async () => {
    const userInfo = await UserAPI.userData();
    const { userData, isAuth } = userInfo;
    if (isAuth) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setAppIsLoading(true);
      setCurrentUserInfo(userData);
      setTheme(userData.theme === "dark" ? "dark" : "light");
      if (userData.showGuideModal) {
        setShowGuide(true);
        setShowSidePanel(false);
        if (userData.cubes.length !== 0) {
          navigate(`/dashboard/cube/${userData.categories[0].cubes[0]}`);
        } else {
          navigate("/dashboard/instructions");
        }
      } else {
        navigate("/dashboard/instructions");
      }
    }
  }, [
    navigate,
    setAppIsLoading,
    setCurrentUserInfo,
    setShowGuide,
    setShowSidePanel,
    setTheme,
  ]);

  useEffect(() => {
    document.title = "Lucuberate | Login Success";
    setTimeout(() => {
      fetchOAuthUser();
    }, 500);
  }, [fetchOAuthUser]);

  return (
    <div class="success-animation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="checkmark"
        viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};

export default LoginSuccess;
