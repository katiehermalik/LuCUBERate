import { memo } from "react";
import "./style.css";

const SidePanelFooter = memo(() => {
  return (
    <footer className="list-footer container-column theme-transition">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="mailto:support@lucuberate.com">
        support@lucuberate.com
      </a>
      <p>{`Copyright \u00A9 ${new Date().getFullYear()} Lucuberate`}</p>
    </footer>
  );
});

export default SidePanelFooter;
