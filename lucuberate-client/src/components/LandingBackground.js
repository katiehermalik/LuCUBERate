import { Canvas } from "react-three-fiber";
import {Stars, OrbitControls } from "drei";
import CubeMesh from "./CubeMesh";
import Lights from "./Lights";


function LandingBackground() {
  return(
    <Canvas 
    id='canvas'           
    shadowMap 
    colorManagement 
    camera={{position: [-5, -7, 5], fov: 30}}>
      <CubeMesh />
      <Lights />
      <Stars 
        radius={150}
        depth={50}
        count={5000}
        factor={3}
        saturation={1}
        fade
      />
      <OrbitControls />
    </Canvas>
  )

}

export default LandingBackground;