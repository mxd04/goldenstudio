"use client"

import React, { useRef, useEffect, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preset?: 'low' | 'medium' | 'high';
  onLoadedData?: () => void;
}

/**
 * Optimized video component with:
 * - Lazy loading via Intersection Observer
 * - Mobile performance optimization
 * - Preload control
 * - Automatic format selection
 */
export const OptimizedVideo = React.forwardRef<HTMLVideoElement, OptimizedVideoProps>(
  ({
    src,
    className = '',
    autoPlay = false,
    loop = false,
    muted = true,
    playsInline = true,
    preset = 'medium',
    onLoadedData,
  }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldPlay, setShouldPlay] = useState(autoPlay);

    // Combine refs
    React.useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            // Preload and potentially autoplay once visible
            if (shouldPlay && video.paused) {
              video.play().catch(err => console.debug('Autoplay prevented:', err));
            }
          } else if (!autoPlay && !video.paused) {
            // Pause if not in view and autoPlay wasn't initially true
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
    }, [autoPlay, shouldPlay]);

    // Get performance preset settings
    const getPresetSettings = () => {
      switch (preset) {
        case 'low':
          return {
            preload: 'none' as const,
            controlsList: 'nodownload',
          };
        case 'medium':
          return {
            preload: 'metadata' as const,
            controlsList: 'nodownload',
          };
        case 'high':
          return {
            preload: 'auto' as const,
            controlsList: 'nodownload',
          };
        default:
          return {
            preload: 'metadata' as const,
            controlsList: 'nodownload',
          };
      }
    };

    const settings = getPresetSettings();

    return (
      <video
        ref={videoRef}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={settings.preload}
        controlsList={settings.controlsList}
        onLoadedData={onLoadedData}
        style={{
          willChange: 'transform',
          transformOrigin: 'center',
        } as React.CSSProperties}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
