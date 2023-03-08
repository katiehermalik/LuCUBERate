import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Instructions = () => {
  useEffect(() => {
    document.title = "Lucuberate | Dashboard";
  }, []);

  return (
    <div className="instructions container-row">
      <h1>
        <span className="force-line-break">
          Select or&nbsp;
          <Link to="/dashboard/new" name="create">
            create&nbsp;
          </Link>
          a cube&nbsp;
        </span>
        <span className="force-line-break">to start studying.</span>
      </h1>
    </div>
  );
};

export default Instructions;
