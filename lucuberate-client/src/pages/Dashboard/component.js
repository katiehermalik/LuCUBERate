import { useRef, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "../../layouts/SidePanel";
import { GuideContext, LayoutContext } from "../../context/ContextProvider";
import "./style.css";

function Dashboard() {
  const { showGuide } = useContext(GuideContext);
  const { setShowSidePanel } = useContext(LayoutContext);
  const pagesRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    if (mediaQuery.matches && !showGuide) {
      const closeUserMenu = e => {
        if (
          pagesRef.current &&
          (pagesRef.current.contains(e.target) || pagesRef.current === e.target)
        ) {
          setShowSidePanel(false);
        }
      };
      document.addEventListener("mousedown", closeUserMenu);
      return () => {
        document.removeEventListener("mousedown", closeUserMenu);
      };
    }
  }, [setShowSidePanel, showGuide]);

  return (
    <div className="dashboard container-row">
      <SidePanel />
      <div ref={pagesRef} className="pages">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
