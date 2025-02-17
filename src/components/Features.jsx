import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import { useRef } from 'react';
import gsap from 'gsap';

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#explore_video', {
      scrollTrigger: {
        trigger: '#explore_video',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap('#feature_title', {
      opacity: 1,
      y: 0,
    }),
      animateWithGsap(
        '.g_grow',
        {
          opacity: 1,
          scale: 1,
          ease: 'power1',
          duration: 1,
          stagger: 0.25,
        },
        { scrub: 5.5 }
      );

    animateWithGsap('.g_text', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
      stagger: 0.5,
    });
  }, []);

  return (
    <section className='h-full common-padding bg-zinc relative overflow-hidden'>
      <div className='screen-max-width'>
        <div className='w-full mb-12'>
          <h1 id='feature_title' className='section-heading'>
            Explore the full story.
          </h1>
        </div>
        <div className='flex flex-col justify-center items-center overflow-hidden'>
          <div className='mt-25 mb-24 pl-24'>
            <h2 className='text-5xl font-semibold lg:text-7xl'>iPhone</h2>
            <h2 className='text-5xl font-semibold lg:text-7xl'>
              Forged in Titanium
            </h2>
          </div>
          <div className='flex flex-col sm:px-10'>
            <div className='w-full relative has-[50vh] flex items-center'>
              <video
                id='explore_video'
                className='w-full h-full object-cover object-center mb-6'
                playsInline
                preload='none'
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>
            <div className='flex flex-col w-full relative '>
              <div className='feature-video-container'>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore1Img}
                    alt='titanium'
                    className='feature-video g_grow'
                  />
                </div>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore2Img}
                    alt='titanium2 '
                    className='feature-video g_grow'
                  />
                </div>
              </div>

              <div className='feature-text-container'>
                <div className='flex-1 flex-center'>
                  <p className='feature-text g_text'>
                    iPhone 15 Pro is{' '}
                    <span className='text-white'>
                      the first iPhone to feature and aerospace-grade titanium
                      design{' '}
                    </span>
                    , using the same alloy that spacecrafts use on missions to
                    mars.
                  </p>
                </div>
                <div className='flex-1 flex-center'>
                  <p className='feature-text g_text'>
                    Titaniums has one of the best strength-to-weight ratio of
                    any metal, making this our{' '}
                    <span className='text-white'>
                      {' '}
                      lightest Pro Models ever.
                    </span>{' '}
                    You'll know when you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
