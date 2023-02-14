import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ContextProvider";
import { MoonIcon, SunIcon } from "@primer/octicons-react";
import UserAPI from "../../utils/api/user";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = async () => {
    setTheme(prevState => (prevState === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    UserAPI.update({ theme: theme });
  }, [theme]);

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
          theme === "dark" ? "switch-btn" : "switch-btn activate-light"
        }
        onClick={handleClick}></button>
    </div>
  );
};

export default ThemeToggle;
