import React, { useContext, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CubeNew from "../pages/CubeNew";
import CubeEdit from "../pages/CubeEdit";
import CubeShow from "../pages/CubeShow";
import Instructions from "../pages/Instructions";
import { CategoryListContext } from "../context/ContextProvider";

const AuthRoutes = ({ user }) => {
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
    <div ref={pagesRef} className="pages">
      {user ? (
        <Switch>
          <Route exact path="/dashboard" render={() => <Instructions />} />
          <Route exact path="/dashboard/new" component={CubeNew} />
          <Route exact path="/dashboard/:id" component={CubeShow} />
          <Route exact path="/dashboard/:id/edit" component={CubeEdit} />
        </Switch>
      ) : (
        <Redirect path="/" />
      )}
    </div>
  );
};

export default AuthRoutes;
