import { useEffect } from "react";
import "./style.css";

const Dashboard404 = () => {
  useEffect(() => {
    document.title = "Lucuberate | 404";
  }, []);

  return (
    <div className="page-not-found Dashboard404">
      <h1>
        Whoops!
        <br></br>
        <span className="force-line-break">
          <span className="force-line-break">
            This&nbsp;
            <span className="force-line-break">resource is&nbsp;</span>
          </span>
          <span className="force-line-break">
            <span className="force-line-break">nowhere to&nbsp;</span>
            <span className="force-line-break">be found.</span>
          </span>
        </span>
      </h1>
      <h4>
        No need to sift through all the cyberspace junk yourself. If you're
        looking for something specific, let us help you find it.
        <br></br>
        <span className="force-line-break contact-us">
          <span className="force-line-break">Contact us:&nbsp;</span>
          <span className="force-line-break">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:support@lucuberate.com">
              support@lucuberate.com
            </a>
          </span>
        </span>
      </h4>
    </div>
  );
};
<span className="force-line-break">Our name is&nbsp;</span>;
export default Dashboard404;
