import React from 'react';
import '../App.css';

import { Canvas } from "react-three-fiber";
import {Stars, OrbitControls } from "drei";


function LandingBackground() {
  return(
    <Canvas id='canvas'>
      <Stars />
      <OrbitControls />
    </Canvas>
  )

}

export default LandingBackground;