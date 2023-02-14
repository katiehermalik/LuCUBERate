import Navbar from "../layouts/Navbar";

const RoutesWithNavbar = ({ currentUserInfo, component }) => {
  return (
    <>
      <Navbar user={currentUserInfo} />
      {component}
    </>
  );
};

export default RoutesWithNavbar;
