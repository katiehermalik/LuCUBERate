import { useRef, useState } from "react";
import { a } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

const CubeMesh = ({ theme }) => {
  const mesh = useRef(null);
  const [hover, setHover] = useState(false);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y;
  });

  return (
    <a.mesh
      className="theme-transition"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[1, 1, 1]}
      position={[0, 1.2, 0]}
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
