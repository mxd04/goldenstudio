"use client"

import React, { useRef, useEffect, useState, VideoHTMLAttributes } from 'react';

interface OptimizedVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'ref'> {
  src: string;
  preset?: 'low' | 'medium' | 'high';
}

/**
 * Optimized video component with:
 * - Lazy loading via Intersection Observer
 * - Mobile performance optimization
 * - Preload control
 */
export const OptimizedVideo = React.forwardRef<HTMLVideoElement, OptimizedVideoProps>(
  ({
    src,
    preset = 'medium',
    ...videoProps
  }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Combine refs
    React.useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting && videoProps.autoPlay && video.paused) {
            video.play().catch(err => console.debug('Autoplay prevented:', err));
          } else if (!entry.isIntersecting && !videoProps.autoPlay && !video.paused) {
            video.pause();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      observer.observe(video);
      return () => observer.unobserve(video);
    }, [videoProps.autoPlay]);

    // Get performance preset settings
    const getPreloadValue = () => {
      switch (preset) {
        case 'low':
          return 'none';
        case 'medium':
          return 'metadata';
        case 'high':
          return 'auto';
        default:
          return 'metadata';
      }
    };

    return (
      <video
        ref={videoRef}
        preload={getPreloadValue() as any}
        {...videoProps}
        style={{
          willChange: 'transform',
          transformOrigin: 'center',
          ...videoProps.style,
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;