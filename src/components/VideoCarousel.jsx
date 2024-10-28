import { useEffect, useRef, useState } from 'react';
import { highlightsSlides } from '../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import { playImg, replayImg, pauseImg } from '../utils';

const VideoCarousel = () => {
  const videoRef = useRef([]); // Refs for video elements.
  const videoSpanRef = useRef([]); // Refs for progress bars.
  const videoDivRef = useRef([]); // Refs for video progress containers.

  // State to manage video status and carousel position.
  const [video, setVideo] = useState({
    isEnd: false, // Indicates if the current video has ended.
    startPlay: false, // Indicates if the video should start playing.
    videoId: 0, // Index of the current video.
    isLastVideo: false, // Indicates if this is the last video.
    isPlaying: false, // Indicates if the video is currently playing.
  });

  const [loadedData, setLoadedData] = useState([]); // Array to store loaded metadata events.
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video; // Destructure video state for easy access.

  // Setting up GSAP animations for slider and video elements.
  useGSAP(() => {
    // Animate the carousel to transition between videos.
    gsap.to('#slider', {
      transform: `translateX(-${videoId * 100}%)`, // Move the slider based on current video.
      duration: 2,
      ease: 'power2.inOut',
    });

    // Trigger video playback on scroll.
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video', // Trigger when #video is in view.
        start: 'center bottom',
        end: 'bottom top',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true, // Start video playback on scroll.
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]); // Re-run animation when videoId or isEnd changes.

  // Effect to play/pause video based on loaded metadata and isPlaying state.
  useEffect(() => {
    if (loadedData.length > 3) {
      // Check if metadata for all videos has loaded.
      if (!isPlaying) {
        videoRef.current[videoId].pause(); // Pause video if not playing.
      } else {
        startPlay && videoRef.current[videoId].play(); // Play video if startPlay is true.
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Adds video metadata (like duration) to loadedData array.
  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  // Effect to manage progress animation for each video.
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate the progress bar as the video plays.
      let animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100);

          // Update progress bar when progress changes.
          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 768
                  ? '10vw'
                  : window.innerWidth < 1200
                  ? '10vw'
                  : '4vw', // Adjust width based on screen size.
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`, // Update progress width.
              backgroundColor: 'white', // Change progress color.
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            // Reset the progress bar after video ends.
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });

      if (videoId === 0) {
        animation.restart(); // Restart animation for the first video.
      }

      const animationUpdate = () => {
        // Update animation progress based on video time.
        animation.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animationUpdate); // Update progress bar while playing.
      } else {
        gsap.ticker.remove(animationUpdate); // Stop updating when not playing.
      }
    }
  }, [videoId, startPlay, isPlaying]);

  // Handle video state changes like end, reset, play, or pause.
  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 })); // Move to next video on end.
        break;

      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true })); // Mark as last video.
        break;

      case 'video-reset':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 })); // Reset to first video.
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying })); // Toggle play.
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying })); // Toggle pause.
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className='flex items-center'>
        {highlightsSlides.map((slide, i) => (
          <div key={i} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'>
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  id='video'
                  preload='auto'
                  playsInline={true}
                  muted
                  ref={(el) => (videoRef.current[i] = el)} // Save video element ref.
                  onEnded={() =>
                    i !== 3
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last', i)
                  } // Detect when video ends.
                  onPlay={() => {
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)} // Store loaded metadata.
                  className={`${
                    slide.id === 2 && 'translate-x-44'
                  } pointer-events-none `}
                >
                  <source src={slide.video} type='video/mp4' />{' '}
                  {/* Video source */}
                </video>
              </div>
              <div className='absolute top-12 left-[5%] z-10'>
                {slide.textLists.map((text, i) => (
                  <p key={i} className='md:text-2xl text-xl font-medium'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop:blur rounded-full'>
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
            >
              <span
                className='h-full w-full absolute rounded-xl'
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className='control-btn'>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} // Select appropriate control icon.
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            } // Reset or toggle play/pause.
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
