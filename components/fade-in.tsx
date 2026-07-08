"use client"

import { useScrollFadeIn } from "@/hooks/use-scroll-fade-in"
import React from "react"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  type?: 'up' | 'left' | 'right' | 'scale'
}

const FadeIn = React.memo(({ 
  children, 
  className = "", 
  type = 'up',
  delay = 0,
}: FadeInProps) => {
  const ref = useScrollFadeIn()

  const animationClass = {
    up: 'fade-in-up',
    left: 'fade-in-left',
    right: 'fade-in-right',
    scale: 'fade-in-scale',
  }[type]

  return (
    <div 
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{ 
        "--animation-delay": `${delay}s`,
        opacity: 0,
      } as React.CSSProperties & { "--animation-delay": string }}
    >
      {children}
    </div>
  )
})

FadeIn.displayName = 'FadeIn'

export default FadeIn