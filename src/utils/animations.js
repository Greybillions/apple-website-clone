import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

// General function to create a GSAP animation with ScrollTrigger
export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
};

// Function to animate elements in a GSAP timeline with rotation
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  // Add a rotation animation for the 3D object
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  // Add animations for the first and second targets with properties spread in the animationProps object
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<' // Wait for the first animation to finish
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<' // Synchronized timing with previous animation
  );
};
