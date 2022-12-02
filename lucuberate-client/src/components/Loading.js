import { PackageIcon } from "@primer/octicons-react";

const Loading = () => {
  return (
    <div className="container-row loading-screen">
      <PackageIcon size={124} className="loading-icon" />
    </div>
  );
};

export default Loading;
