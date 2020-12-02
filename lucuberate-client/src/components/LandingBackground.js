import React from 'react';
import '../App.css';

import { Canvas } from "react-three-fiber";
import {Stars, OrbitControls } from "drei";


function LandingBackground() {
  return(
    <Canvas id='canvas'>
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