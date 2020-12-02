import { useRef, useState } from 'react';
import { a } from "react-spring/three"
import { useFrame } from "react-three-fiber";

function CubeMesh() {
  const mesh = useRef(null);
  const [hover, setHover] = useState(false)
  
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y
  });
  
  return (
    <a.mesh 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[0.6, 0.6, 0.6]}
      position={[0, 1.5, 0]}
      ref={mesh}>
      <boxBufferGeometry 
        attach='geometry'/>
      <meshStandardMaterial 
        attach='material' 
        color={hover ? '#87919E' : '#8DA7BE'} />
    </a.mesh>

  )
}

export default CubeMesh;