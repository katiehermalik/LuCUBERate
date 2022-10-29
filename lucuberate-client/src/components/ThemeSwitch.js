import React, { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloudMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="switch-container">
      <i className="icon-chevron">
        <FontAwesomeIcon icon={faSun} />
      </i>
      <i className="icon-chevron">
        <FontAwesomeIcon icon={faCloudMoon} />
      </i>
      <button
        title={darkMode ? "switch to light theme" : "switch to dark theme"}
        className={darkMode ? "switch-btn" : "switch-btn activate-light"}
        onClick={handleClick}></button>
    </div>
  );
};

export default ThemeSwitch;
