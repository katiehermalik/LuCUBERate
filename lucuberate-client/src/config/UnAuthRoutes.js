import { Route } from "react-router-dom";
import Landing from "../pages/Landing";

function UnAuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Landing} />
    </>
  );
}

export default UnAuthRoutes;
