import { useEffect } from "react";

const App404 = () => {
  useEffect(() => {
    document.title = "Lucuberate | 404";
  }, []);

  return (
    <div className="page-not-found app-404">
      <h1>App 404</h1>
      <h4>This is the app 404 page.</h4>
    </div>
  );
};

export default App404;
