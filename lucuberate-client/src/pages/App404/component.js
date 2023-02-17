import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"

const App404 = () => {
  useEffect(() => {
    document.title = "Lucuberate | 404";
  }, []);

  return (
    <div className="page-not-found app-404">
      <h1>
        Whoops!
        <br></br>
        <span className="force-line-break">
          <span className="force-line-break">
            This&nbsp;
            <span className="force-line-break">page is&nbsp;</span>
          </span>
          <span className="force-line-break">
            <span className="force-line-break">nowhere to&nbsp;</span>
            <span className="force-line-break">be found.</span>
          </span>
        </span>
      </h1>
      <h4>
        Your studying has taken you far... maybe too far? We aren't sure how you
        got lost out here in cyberspace, but we're happy to direct you back to
        the <Link to="/dashboard/instructions">dashboard</Link>.
      </h4>
    </div>
  );
};

export default App404;
