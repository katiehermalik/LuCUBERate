import { useRef, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "../../layouts/SidePanel";
import NavbarMobile from "../../layouts/NavbarMobile";
import { CategoryListContext } from "../../context/ContextProvider";

function Dashboard({ user }) {
  const { setShowSidePanel } = useContext(CategoryListContext);
  const pagesRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    if (mediaQuery.matches) {
      const closeUserMenu = e => {
        if (
          pagesRef.current &&
          (pagesRef.current.contains(e.target) || pagesRef.current === e.target)
        ) {
          setShowSidePanel(false);
        }
      };
      document.addEventListener("mousedown", closeUserMenu);
    }
  }, [setShowSidePanel]);

  return (
    <>
      <div className="dashboard container-row theme-transition">
        <SidePanel />
        <div ref={pagesRef} className="pages">
          <Outlet />
        </div>
      </div>
      <div className="mobile-only-nav">
        <NavbarMobile user={user} />
      </div>
    </>
  );
}

export default Dashboard;
