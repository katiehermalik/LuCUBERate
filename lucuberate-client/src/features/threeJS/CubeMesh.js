import { useRef, useState } from "react";
import { a } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

const CubeMesh = ({ theme }) => {
  const mesh = useRef(null);
  const [hover, setHover] = useState(false);

  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() * 0.25;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  return (
    <a.mesh
      className="theme-transition"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[1.5, 1.5, 1.5]}
      position={[-0.5, 0.5, -1]}
      rotation-y={40}

      ref={mesh}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        className="theme-transition"
        attach="material"
        color={
          theme === "dark"
            ? hover
              ? "#51636f"
              : "#3e5260"
            : hover
            ? "#6a859c"
            : "#5a7892"
        }
      />
    </a.mesh>
  );
};

export default CubeMesh;
