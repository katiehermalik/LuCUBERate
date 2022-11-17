import { useEffect } from "react";

const Instructions = () => {
  useEffect(() => {
    document.title = "Lucuberate | Dashboard";
  }, []);

  return (
    <div className="instructions container-row theme-transition">
      <h1>Select or make a new cube to start studying.</h1>
    </div>
  );
};

export default Instructions;
