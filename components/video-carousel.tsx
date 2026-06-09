"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link';
import { gsap } from 'gsap';
import FadeIn from './fade-in';

const videos = [
  "/1.mp4",
  "/all.mp4",
  "/2.mp4",
  "/3.mp4",
  "/4.mp4",
  "/5.mp4",
  "/6.mp4",
  "/7.mp4",
  "/15.mp4",
  "/11.mp4",
  "/b.MOV",
  "/c.MOV",
  "/d.MOV",
  "/e.MOV",
  "/f.MOV",
  "/g.mp4",
]

const GLOW_COLOR = '237, 205, 127';
const SPOTLIGHT_RADIUS = 400;
const PARTICLE_COUNT = 12;

interface MagicBentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const MagicBentoCard: React.FC<MagicBentoCardProps> = React.memo(({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<any[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    
    memoizedParticles.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(${GLOW_COLOR}, 1);
        box-shadow: 0 0 6px rgba(${GLOW_COLOR}, 0.6);
        pointer-events: none;
        z-index: 40;
        left: ${Math.random() * width}px;
        top: ${Math.random() * height}px;
      `;
      return el;
    });
    particlesInitialized.current = true;
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => { particle.parentNode?.removeChild(particle); }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${GLOW_COLOR}, 0.4) 0%, rgba(${GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 50;
      `;
      element.appendChild(ripple);

      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#edcd7f',
        zIndex: 10,
        ['--glow-color' as any]: GLOW_COLOR
      }}
    >
      {children}
    </div>
  );
})

MagicBentoCard.displayName = 'MagicBentoCard'

export default function HaircutsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isInsideSection = useRef(false)

  const [isEventDragging, setIsEventDragging] = useState(false)
  const [eventStartX, setEventStartX] = useState(0)
  const [eventScrollLeft, setEventScrollLeft] = useState(0)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!gridRef.current) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${GLOW_COLOR}, 0.15) 0%,
        rgba(${GLOW_COLOR}, 0.08) 15%,
        rgba(${GLOW_COLOR}, 0.04) 25%,
        rgba(${GLOW_COLOR}, 0.02) 40%,
        rgba(${GLOW_COLOR}, 0.01) 65%,
        transparent 70%
      );
      z-index: 5;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      isInsideSection.current = mouseInside;

      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); });
        return;
      }

      const proximity = SPOTLIGHT_RADIUS * 0.5;
      const fadeDistance = SPOTLIGHT_RADIUS * 0.75;
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

        cardElement.style.setProperty('--glow-x', `${relativeX}%`);
        cardElement.style.setProperty('--glow-y', `${relativeY}%`);
        cardElement.style.setProperty('--glow-intensity', glowIntensity.toString());
        cardElement.style.setProperty('--glow-radius', `${SPOTLIGHT_RADIUS}px`);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth > 0 && windowWidth < 768

  const scrollToVideoIndex = useCallback((index: number) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const itemWidth = isMobile ? 280 : 384
    const targetScroll = index * itemWidth
    const currentScroll = container.scrollLeft
    const distance = targetScroll - currentScroll
    const duration = 600 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function: easeInOutCubic
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      
      container.scrollLeft = currentScroll + distance * easeProgress
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    setCurrentIndex(index)
  }, [isMobile])

  const handleNext = () => {
    const maxIndex = videos.length - (isMobile ? 1 : 3)
    if (currentIndex < maxIndex) { scrollToVideoIndex(currentIndex + 1) } else { scrollToVideoIndex(0) }
  }

  const handlePrev = () => {
    if (currentIndex > 0) { scrollToVideoIndex(currentIndex - 1) } else { const maxIndex = videos.length - (isMobile ? 1 : 3); scrollToVideoIndex(maxIndex) }
  }

  const handleEventMouseDown = (e: React.MouseEvent) => {
    setIsEventDragging(true);
    setEventStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setEventScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleEventMouseMove = (e: React.MouseEvent) => {
    if (!isEventDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - eventStartX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = eventScrollLeft - walk;
      const itemWidth = isMobile ? 280 : 384
      const newIndex = Math.round(carouselRef.current.scrollLeft / itemWidth)
      setCurrentIndex(newIndex)
    }
  };

  const stopEventDragging = () => setIsEventDragging(false);

  return (
    <section id="haircuts-section" className="relative w-full bg-[#0a0a0a] py-24 overflow-hidden">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customShine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .shiny-text-effect {
          background: linear-gradient(120deg, #edcd7f 30%, #ffffff 50%, #edcd7f 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: customShine 4s linear infinite;
        }
        .magic-bento-card {
          position: relative;
          overflow: hidden;
          background-color: #edcd7f;
          z-index: 10;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .magic-bento-card img {
          image-rendering: auto;
          image-rendering: high-quality;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          will-change: auto;
        }
        .magic-bento-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .magic-bento-card--border-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x, 0%) var(--glow-y, 0%),
            rgba(var(--glow-color), var(--glow-intensity, 0)),
            transparent
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 30;
          will-change: auto;
        }
      `}} />

      {/* HEADER */}
      <div className="flex flex-col items-center text-center px-6 mb-20">
        <FadeIn type="up">
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Descoperă cele mai <br />
            fresh tunsori din <span className="shiny-text-effect">Sibiu</span>.
          </h2>
        </FadeIn>

        <FadeIn type="up" delay={0.2}>
          <p className="mt-6 text-zinc-400 text-lg md:text-2xl max-w-[700px] font-medium">
            Alături de o atmosferă premium și servicii impecabile,
            vino să faci parte din experiență.
          </p>
        </FadeIn>

        {/* CONTAINER PROGRAMARE */}
        <div 
          ref={dropdownRef}
          className="relative mt-10 z-50"
          onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
          onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
        >
          <button
            onClick={() => isMobile && setIsDropdownOpen(!isDropdownOpen)}
            className="
              px-8 py-4 rounded-full bg-[#edcd7f] text-black font-semibold text-[15px]
              hover:scale-[1.03] hover:bg-[#d0a95d] active:scale-[0.98] transition-all duration-300
              shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-2
            "
          >
            Programează-te
          </button>

          {/* DROPDOWN RELUCRAT: FĂRĂ BORDER, FĂRĂ ICONIȚE, SHADOW GLOW INTENS PE #edcd7f */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[240px] p-2 bg-[#121212] rounded-[24px] shadow-[0_0_25px_rgba(237,205,127,0.3)] flex flex-col gap-1 z-50"
              >
                {/* OPTIUNEA MERO */}
                <Link 
                  href="https://mero.ro/p/golden-studio" 
                  target="_blank"
                  className="flex flex-col items-start text-left px-5 py-3 rounded-[18px] hover:bg-[#edcd7f]/10 text-white transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="font-semibold text-[14px]">Online pe Mero</span>
                  <span className="text-[11px] text-zinc-500 mt-0.5">Rapid și simplu</span>
                </Link>

                {/* OPTIUNEA TELEFON */}
                <a 
                  href="tel:+40774948646" 
                  className="flex flex-col items-start text-left px-5 py-3 rounded-[18px] hover:bg-[#edcd7f]/10 text-white transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="font-semibold text-[14px]">0774 948 646</span>
                  <span className="text-[11px] text-zinc-500 mt-0.5">Programare telefonică</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* TOP PANEL BENTO GRID */}
      <div ref={gridRef} className="w-full max-w-7xl mx-auto px-6 select-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <MagicBentoCard className="h-[260px] rounded-[32px] transition-transform duration-500 hover:scale-105 magic-bento-card--border-glow">
              <img src="/side.jpg" alt="" className="w-full h-full object-cover pointer-events-none relative z-10" />
            </MagicBentoCard>
            <MagicBentoCard className="h-[340px] rounded-[32px] transition-transform duration-500 hover:scale-105 magic-bento-card--border-glow">
              <img src="/3.jpg" alt="" className="w-full h-full object-cover pointer-events-none relative z-10" />
            </MagicBentoCard>
          </div>

          {/* CENTER HERO */}
          <div className="md:col-span-2">
            <MagicBentoCard className="relative h-[620px] rounded-[42px] transition-transform duration-500 hover:scale-105 magic-bento-card--border-glow">
              <img src="/desprenoi.jpg" alt="" className="w-full h-full object-cover pointer-events-none relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#BDB214]/20 blur-[120px] pointer-events-none z-20" />
            </MagicBentoCard>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            <MagicBentoCard className="h-[340px] rounded-[32px] transition-transform duration-500 hover:scale-105 magic-bento-card--border-glow">
              <img src="/4.jpg" alt="" className="w-full h-full object-cover pointer-events-none relative z-10" />
            </MagicBentoCard>
            <MagicBentoCard className="h-[260px] rounded-[32px] transition-transform duration-500 hover:scale-105 magic-bento-card--border-glow">
              <img src="/5.jpg" alt="" className="w-full h-full object-cover pointer-events-none relative z-10" />
            </MagicBentoCard>
          </div>

        </div>
      </div>

      {/* VIDEO CAROUSEL */}
      <div className="relative w-full mt-20 overflow-hidden">
        <div className="hidden md:block absolute left-0 top-0 h-full w-[40%] z-30 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 h-full w-[40%] z-30 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent pointer-events-none" />

        {/* FLOATING TAGS */}
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: -6, y: -6 }}
          className="absolute left-[8%] md:left-[18%] top-[8%] md:top-[22%] z-40 flex pointer-events-none md:pointer-events-auto"
        >
          <div className="px-5 py-2 rounded-full bg-[#2C7BDB] text-white font-semibold shadow-[0_10px_40px_rgba(44,123,219,0.45)] border border-white/10 backdrop-blur-xl rotate-[-12deg] transition-all duration-300">
            Fade
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: 4, y: -6 }}
          className="absolute left-[12%] md:left-[22%] bottom-[12%] md:bottom-[22%] z-40 flex pointer-events-none md:pointer-events-auto"
        >
          <div className="px-5 py-2 rounded-full bg-green-500 backdrop-blur-xl text-white font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.45)] border border-white/10 rotate-[8deg] transition-all duration-300">
            Taper
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: 6, y: -6 }}
          className="absolute right-[8%] md:right-[18%] top-[15%] md:top-[24%] z-40 flex pointer-events-none md:pointer-events-auto"
        >
          <div className="px-5 py-2 rounded-full bg-red-500/60 text-white font-semibold shadow-[0_10px_40px_rgba(220,38,38,0.45)] border border-white/10 backdrop-blur-xl rotate-[9deg] transition-all duration-300">
            Modern
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: -4, y: -6 }}
          className="absolute right-[12%] md:right-[18%] bottom-[15%] md:bottom-[24%] z-40 flex pointer-events-none md:pointer-events-auto"
        >
          <div className="px-5 py-2 rounded-full bg-pink-500 backdrop-blur-xl text-white font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.45)] border border-white/10 rotate-[-8deg] transition-all duration-300">
            Style
          </div>
        </motion.div>

        {/* WRAPPER */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div 
            ref={carouselRef}
            onMouseDown={handleEventMouseDown}
            onMouseMove={handleEventMouseMove}
            onMouseUp={stopEventDragging}
            onMouseLeave={stopEventDragging}
            className="relative w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-6 py-6">
              {videos.map((video, idx) => {
                const isNearby = Math.abs(idx - currentIndex) <= 2
                return (
                  <div key={idx} className="shrink-0">
                    <div className="relative w-[280px] md:w-[360px] h-[480px] md:h-[620px] rounded-[38px] overflow-hidden border border-white/10 bg-zinc-900 transition-transform duration-500 hover:scale-[1.03]">
                      <video 
                        src={isNearby ? video : undefined}
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        preload={isNearby ? "auto" : "none"}
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-white/10 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-white/10 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}