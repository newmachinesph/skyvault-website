"use client";

import { useEffect, useRef, useCallback } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const tick = useCallback((timestamp: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000; // seconds
    lastTimeRef.current = timestamp;

    if (directionRef.current === -1) {
      // Manually scrub backward
      video.currentTime = Math.max(0, video.currentTime - delta * video.playbackRate);
      if (video.currentTime <= 0.05) {
        // Switch to forward
        directionRef.current = 1;
        video.currentTime = 0;
        video.play();
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleEnded() {
      if (!video) return;
      // Switch to reverse
      directionRef.current = -1;
      video.pause();
      lastTimeRef.current = 0;
    }

    video.addEventListener("ended", handleEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <video
      ref={videoRef}
      src="/video-3405db71-f15d-4151-8883-0118dafccf44.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
