import { useState, useRef, useEffect } from 'react';
import { yellowImg } from '../utils';
import { models, sizes } from '../constants';
import ModelView from './ModelView';
import { animateWithGsapTimeline } from '../utils/animations';

import * as THREE from 'three';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';

const Model = () => {
  // State for selected size (small or large)
  const [size, setSize] = useState('small');

  // State for selected model details
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'], // Model color options
    img: yellowImg, // Placeholder image for the model
  });

  // Refs for camera controls of small and large views
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Group refs for small and large model views
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Rotation states for small and large models
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // Initialize a GSAP timeline
  const tl = gsap.timeline();

  // Effect to animate model transition when size changes
  useEffect(() => {
    if (size === 'large') {
      // Animate small model to slide out of view
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2,
      });
    }
    if (size === 'small') {
      // Animate large model to slide into view
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2,
      });
    }
  }, [size]); // Re-run on `size` change

  // Animate the heading when it enters the viewport
  useGSAP(() => {
    animateWithGsap('#heading', {
      opacity: 1,
      y: 0,
    });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        {/* Section Heading */}
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>

        <div className='flex flex-col items-center mt-5'>
          {/* 3D Model Container */}
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            {/* Small Model View */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            {/* Large Model View */}
            <ModelView
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            {/* Canvas to Render 3D Model Views */}
            <Canvas
              className='w-full h-full'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          {/* Model Information and Controls */}
          <div className='mx-auto w-full'>
            <p className='text-center font-light text-sm mb-5'>{model.title}</p>

            {/* Model Color Selection */}
            <div className='flex-center'>
              <ul className='color-container'>
                {models.map((model, i) => (
                  <li
                    key={i}
                    className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                    style={{ backgroundColor: model.color[0] }}
                    onClick={() => {
                      setModel(model);
                    }}
                  />
                ))}
              </ul>

              {/* Size Selection Buttons */}
              <button className='size-btn-container'>
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className='size-btn'
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
