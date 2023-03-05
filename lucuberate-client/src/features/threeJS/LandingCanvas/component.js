import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import CubeMesh from "../CubeMesh";
import Lights from "../Lights";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../../context/ContextProvider";
import "./style.css";

const LandingCanvas = ({ user }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Lucuberate | Home";
  }, []);

  return (
    <Canvas
      className="landing-canvas"
      camera={{ position: [5, 5, -5], fov: 30 }}>
      <CubeMesh theme={theme} />
      <Lights />
      <Stars
        radius={25}
        depth={50}
        count={4000}
        factor={2}
        saturation={2}
        fade
      />
      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        autoRotateSpeed={0.02}
      />
    </Canvas>
  );
};

export default LandingCanvas;
