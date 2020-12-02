import { Canvas } from "react-three-fiber";
import {Stars, OrbitControls } from "drei";
import CubeMesh from "./CubeMesh";
import Lights from "./Lights";


function LandingBackground() {
  return(
    <Canvas 
      className='landing-background'           
      camera={{
      position: [-5, 5, 5], 
      fov: 30}}>
      <CubeMesh />
      <Lights />
      <Stars 
        radius={50}
        depth={50}
        count={3000}
        factor={3}
        saturation={1}
        fade />
      <OrbitControls 
        enableZoom={false} />
    </Canvas>
  )

}

export default LandingBackground;