import { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  GuideContext,
  LayoutContext,
} from "../../../../context/ContextProvider";
import Loading from "../../../../components/Loading";
import UserAPI from "../../../../utils/api/user";

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
        if (userData.newUser) {
          navigate(`/dashboard/cube/${userData.categories[2].cubes[0]}`);
        } else if (userData.cubes.length !== 0) {
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
    fetchOAuthUser();
  }, [fetchOAuthUser]);

  return <Loading />;
};

export default LoginSuccess;
