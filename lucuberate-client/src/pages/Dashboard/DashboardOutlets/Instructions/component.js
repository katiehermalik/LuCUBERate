import { useEffect } from "react";
import "./style.css"

const Instructions = () => {
  useEffect(() => {
    document.title = "Lucuberate | Dashboard";
  }, []);

  return (
    <div className="instructions container-row theme-transition">
      <h1>
        <span className="force-line-break">Select or create a cube&nbsp;</span>
        <span className="force-line-break">to start studying.</span>
      </h1>
    </div>
  );
};

export default Instructions;
