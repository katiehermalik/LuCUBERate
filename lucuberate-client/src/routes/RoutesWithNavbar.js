import Navbar from "../layouts/Navbar";

const RoutesWithNavbar = ({ component }) => {

  return (
    <>
      <Navbar />
      {component}
    </>
  );
};

export default RoutesWithNavbar;
