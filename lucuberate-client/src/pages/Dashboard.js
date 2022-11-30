import { useRef, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CubeListCtrl from "../components/CubeListCtrl/CubeListCtrl";
import NavbarMobile from "../components/NavbarMobile";
import { CategoryListContext } from "../context/ContextProvider";

function Dashboard({ user }) {
  const { setShowCategoryList } = useContext(CategoryListContext);
  const pagesRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    if (mediaQuery.matches) {
      const closeUserMenu = e => {
        if (
          pagesRef.current &&
          (pagesRef.current.contains(e.target) || pagesRef.current === e.target)
        ) {
          setShowCategoryList(false);
        }
      };
      document.addEventListener("mousedown", closeUserMenu);
    }
  }, [setShowCategoryList]);

  return (
    <>
      <div className="dashboard container-row theme-transition">
        <CubeListCtrl />
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
