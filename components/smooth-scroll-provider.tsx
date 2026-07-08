"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"

const SmoothScrollProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Detect if we're on mobile
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // DISABLE Lenis on mobile - it's too heavy
    if (isMobile || prefersReducedMotion) {
      return;
    }

    // Only initialize Lenis on desktop
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const animationId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <>{children}</>
})

SmoothScrollProvider.displayName = 'SmoothScrollProvider'

export default SmoothScrollProvider
