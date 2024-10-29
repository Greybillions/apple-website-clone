import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';
import * as THREE from 'three';
import Lights from './Lights';
import { Suspense } from 'react';
import IPhone from './IPhone';
import Loader from './Loader';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    // View wrapper to manage CSS styles and identify view with `gsapType` ID
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient light for subtle global illumination across the model */}
      <ambientLight intensity={0.3} />

      {/* Perspective camera positioned to capture the model with depth */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      {/* Lights component, adding additional lighting setup */}
      <Lights />

      {/* OrbitControls enables camera rotation, disables zoom/pan for focus */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        target={new THREE.Vector3(0, 0, 0)} // Centers control on model
        // Updates rotation state when rotation ends
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      {/* Group component for grouping 3D model with specific scale/position */}
      <group
        ref={groupRef} // Reference for GSAP animations and transforms
        name={index === 1 ? 'small' : 'large'}
        position={[0, 0, 0]}
      >
        {/* Suspense allows lazy loading of the IPhone component */}
        <Suspense fallback={<Loader />}>
          {/* Shows Loader until model loads */}
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
