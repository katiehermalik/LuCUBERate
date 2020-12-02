import { Canvas } from "react-three-fiber";
import {Stars, OrbitControls } from "drei";
import CubeMesh from "./CubeMesh";


function LandingBackground() {
  return(
    <Canvas id='canvas'>
      <CubeMesh />
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