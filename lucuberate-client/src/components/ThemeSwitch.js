import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { MoonIcon, SunIcon } from "@primer/octicons-react";
import UserModel from "../models/user";

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user_Id } = JSON.parse(sessionStorage.getItem("user")) || "";

  const handleClick = async () => {
    setTheme(prevState => (prevState === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    UserModel.update({ theme: theme }, user_Id);
  }, [theme, user_Id]);

  return (
    <div className="switch-container">
      <div className="switch-background">
        <SunIcon size={16} />
        <MoonIcon size={16} />
      </div>
      <button
        id="theme-switch"
        title={
          theme === "dark" ? "switch to light theme" : "switch to dark theme"
        }
        className={
          theme === "dark" ? "btn switch-btn" : "btn switch-btn activate-light"
        }
        onClick={handleClick}></button>
    </div>
  );
};

export default ThemeSwitch;
