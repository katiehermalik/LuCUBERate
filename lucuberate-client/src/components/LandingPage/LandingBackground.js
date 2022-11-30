import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import CubeMesh from "./CubeMesh";
import Lights from "./Lights";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ContextProvider";

const LandingBackground = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Lucuberate | Home";
  }, []);

  return (
    <Canvas
      className="landing-background"
      camera={{ position: [5, 5, -5], fov: 30 }}>
      <CubeMesh theme={theme} />
      <Lights />
      <Stars
        radius={25}
        depth={50}
        count={4000}
        factor={3}
        saturation={2}
        fade
      />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};

export default LandingBackground;
