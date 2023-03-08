import { memo } from "react";
import "./style.css";

const SidePanelFooter = memo(() => {
  return (
    <footer className="list-footer container-column">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="mailto:support@lucuberate.com">
        support@lucuberate.com
      </a>
      <p>{`Copyright \u00A9 ${new Date().getFullYear()} Katie Hermalik`}</p>
    </footer>
  );
});

export default SidePanelFooter;
