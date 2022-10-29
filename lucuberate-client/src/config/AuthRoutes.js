import React from "react";
import { Switch, Route } from "react-router-dom";
import CubeNew from "../pages/CubeNew";
import CubeEdit from "../pages/CubeEdit";
import CubeShow from "../pages/CubeShow";
import Index from "../pages/Index";

const AllAuthenticatedRoutes = ({ user }) => {
  return (
    <div className="pages">
      {user && (
        <Switch>
          <Route exact path="/dashboard" render={() => <Index user={user} />} />
          <Route exact path="/dashboard/new" component={CubeNew} />
          <Route exact path="/dashboard/:id" component={CubeShow} />
          <Route exact path="/dashboard/:id/edit" component={CubeEdit} />
        </Switch>
      )}
    </div>
  );
};

export default AllAuthenticatedRoutes;
