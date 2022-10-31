import React, { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { MoonIcon, SunIcon } from "@primer/octicons-react";

const ThemeSwitch = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="switch-container">
      <div className="switch-background">
        <SunIcon size={16} />
        <MoonIcon size={16} />
      </div>
        <button
          title={darkMode ? "switch to light theme" : "switch to dark theme"}
          className={darkMode ? "switch-btn" : "switch-btn activate-light"}
          onClick={handleClick}></button>
    </div>
  );
};

export default ThemeSwitch;
