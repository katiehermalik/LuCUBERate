import { useRef, useState } from 'react';
import { useSpring, a } from "react-spring/three"
import { useFrame } from "react-three-fiber";

function CubeMesh() {
  const mesh = useRef(null);
  const [hover, setHover] = useState(false)
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1, 1, 1] : [1.5, 1, .05],
  });
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y));
  return(

      <a.mesh 
      onPointerOver={() => {
        setHover(true)
        }}
      onPointerOut={() => {
        setHover(false)
        }}
      onClick={() => {
        setHover(false)
        setExpand(!expand)
        }}
      scale={props.scale}
      castShadow
      position={[0, 1, 0]}
      ref={mesh}>
        <boxBufferGeometry 
        attach='geometry'/>
        <meshStandardMaterial attach='material' color={hover ? '#87919E' : '#8DA7BE'} />
      </a.mesh>

  )
}

export default CubeMesh;