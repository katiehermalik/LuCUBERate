import { useEffect } from "react";

const Dashboard404 = () => {
  useEffect(() => {
    document.title = "Lucuberate | 404";
  }, []);

  return (
    <div className="page-not-found Dashboard404">
      <h1>Dashboard 404</h1>
      <h4>This is the dashboard 404 page.</h4>
    </div>
  );
};

export default Dashboard404;
