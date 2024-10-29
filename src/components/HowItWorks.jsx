import { chipImg, frameImg, frameVideo } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { animateWithGsap } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },
      opacity: 0,
      scale: 1.1,
      duration: 2,
      ease: 'power2.inOut',
    });

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
      ease: 'power2.inOut',
    });
  });

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <div id='chip' className='w-full flex-center my-20'>
          <img src={chipImg} alt='chip' width={180} height={180} />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className='hiw-title'>
            A17 Pro Chip. <br />A monster when gaming.
          </h2>
          <p className='hiw-subtitle'>
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
        <div className='mt-10 md:mt-20 mb-14'>
          <div className='relative h-full flex-center'>
            <div className='overflow-hidden'>
              <img
                src={frameImg}
                alt='frame'
                className='bg-transparent z-10 relative'
              />
            </div>
            <div className='hiw-video'>
              <video
                className='pointer-events-none'
                playsInline
                muted
                autoPlay
                preload='none'
                ref={videoRef}
              >
                <source src={frameVideo} type='video/mp4' />
              </video>
            </div>
          </div>
          <p className='mt-3 text-center text-gray font-semibold'>
            Honkai: Star Rail
          </p>
        </div>
        <div className='hiw-text-container common-padding'>
          <div className='flex flex-1 justify-center flex-col'>
            <p className='hiw-text g_fadeIn'>
              A17 Pro is an entirely new class of iPhone that delivers our{' '}
              <span className='text-white'> best graphic by far.</span>
            </p>

            <p className='hiw-text g_fadeIn sm:mt-5 mt-3'>
              Mobile{' '}
              <span className='text-white'>
                games will look and fell so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className='flex flex-1 justify-center flex-col g_fadeIn'>
            <p className='hiw-text'>New</p>
            <p className='hiw-bigtext'>Pro-class</p>
            <p className='hiw-text'>With 6 Cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
