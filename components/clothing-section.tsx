"use client"

import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Phone, MapPin, ExternalLink, Check } from 'lucide-react';
import FadeIn from './fade-in';

// Setări fizice pentru efectul de spring (arcuri elastice)
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

interface TiltedCardProps {
  children: React.ReactNode;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
}

// Sub-componentă adaptată în TypeScript ce suportă orice conținut injectat (Butoane, Video etc.)
const TiltedCard: React.FC<TiltedCardProps> = React.memo(({
  children,
  captionText = '',
  containerHeight = '450px',
  containerWidth = '100%',
  scaleOnHover = 1.04,
  rotateAmplitude = 10,
  showTooltip = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <div
      ref={ref}
      className="tilted-card-figure w-full relative"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner w-full h-full rounded-[38px] overflow-hidden bg-[#120F17]"
        style={{ rotateX, rotateY, scale }}
      >
        <div className="tilted-card-overlay w-full h-full p-8 md:p-10">
          {children}
        </div>
      </motion.div>

      {showTooltip && captionText && (
        <motion.span
          className="tilted-card-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.span>
      )}
    </div>
  );
});

TiltedCard.displayName = 'TiltedCard';

export default function ClothingSection() {
  const [isCopied, setIsCopied] = useState(false);
  const phoneNumber = "0774 948 646"; // Pune aici numărul tău real de telefon

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2500); // Revine la starea inițială după 2.5 secunde
    } catch (err) {
      console.error("Eroare la copiere:", err);
    }
  };

  return (
    <section id="clothing-section" className="relative w-full bg-[#0a0a0a] py-24 overflow-hidden border-t border-white/10">
      
      {/* HEADER: DOAR TITLU, FĂRĂ SUBTITLU */}
      <div className="flex flex-col items-center text-center px-6 mb-20">
        <FadeIn type="up">
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Locația noastră<br />
            cu un vibe <span className="shiny-text-effect">industrial</span>.
          </h2>
        </FadeIn>

        <FadeIn type="up" delay={0.2}>
          <p className="mt-6 text-zinc-400 text-lg md:text-2xl max-w-[700px] font-medium">
            Ne aflam in complexul Cedonia - Etajul 1 <br />
            Strada Nicolae Iorga 52.
          </p>
        </FadeIn>

      </div>

      {/* CELE DOUA CARDURI CU FUNDAL VIDEO ȘI EFECT 3D TILT */}
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">

        {/* CARDUL 1: SOCIALS (Cu video în fundal) */}
        <TiltedCard containerHeight="450px">
          {/* Fundal Video Looped stânga */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <video 
              src="/all.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-100 filter brightness-[1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120F17] via-[#120F17]/70 to-black/40" />
          </div>

          <div className="w-full h-full flex flex-col justify-between text-left relative z-10">
            <div>
              <h3 className="text-3xl font-bold text-white mt-2 leading-tight">Socials &<br />Programări</h3>
            </div>

            {/* BUTOANE INTERACTIVE */}
            <div className="flex flex-col gap-3 mt-6 w-full">
              <Link href="https://www.instagram.com/goldenstudio.cs?igsh=a3k5bTBpOGZ0ZHRr" target="_blank" className="w-full cursor-pointer">
                <button className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-md text-white font-medium text-[15px] flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </div>
                  <ExternalLink size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>

              <Link href="https://mero.ro/p/golden-studio" target="_blank" className="w-full cursor-pointer">
                <button className="w-full px-6 py-4 rounded-2xl bg-white text-black font-semibold text-[15px] flex items-center justify-between hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2C7BDB] animate-pulse" />
                    <span>Rezervă pe Mero</span>
                  </div>
                  <ExternalLink size={16} />
                </button>
              </Link>

              {/* BUTONUL DE TELEFON CU EFECT DE UMPLERE ȘI COPIERE */}
              <button 
                onClick={handleCopyPhone}
                className="
                  w-full px-6 py-4 rounded-2xl border text-white font-medium text-[15px] 
                  flex items-center justify-between relative overflow-hidden transition-all duration-300
                  bg-white/[0.03] border-white/10 hover:bg-white/[0.08] active:scale-[0.98] cursor-pointer
                "
              >
                {/* Stratul de culoare care umple fundalul la click */}
                <AnimatePresence>
                  {isCopied && (
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "0%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 bg-[#edcd7f] z-0"
                    />
                  )}
                </AnimatePresence>

                {/* Conținut text */}
                <div className="flex items-center gap-3 relative z-10 w-full justify-between">
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div 
                        key="copied"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-3 w-full"
                      >
                        <Check size={18} className="text-black" />
                        <span className="font-semibold text-black">Număr copiat!</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="static"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-3 w-full justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Phone size={18} />
                          <span>{phoneNumber}</span>
                        </div>
                        <span className="text-xs text-white/40 uppercase tracking-wider font-semibold group-hover:text-white/80">Apasă pentru copiere</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </div>
        </TiltedCard>

        {/* CARDUL 2: VIDEO LOOPED + INDICAȚII GOOGLE MAPS PE MIJLOC */}
        <TiltedCard containerHeight="450px">
          {/* Fundal Video Looped dreapta */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <video 
              src="/locatie.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-60 filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120F17] via-transparent to-black/60" />
          </div>

          {/* Container centrat complet (fără cursor-pointer general) */}
          <div className="w-full h-full flex items-center justify-center relative z-10">
            
            {/* Butonul de Direcții plasat transparent în mijloc cu blur și cursor-pointer doar pe el */}
            <Link href="https://www.google.com/maps/dir//Golden+Studio,+Strada+Nicolae+Iorga+52,+550361+Sibiu/@45.7799987,24.1562433,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x474c5dcb4351d831:0xc14a499e9b45477f!2m2!1d24.1573543!2d45.7811232?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="w-full max-w-xs cursor-pointer">
              <button 
                className="
                  w-full px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-white font-semibold text-[15px]
                  flex items-center justify-center gap-3 hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.99] transition-all duration-300
                  shadow-[0_10px_30px_rgba(0,0,0,0.2)] cursor-pointer
                "
              >
                <MapPin size={18} />
                <span>Indicații Google Maps</span>
              </button>
            </Link>

          </div>
        </TiltedCard>

      </div>
    </section>
  );
}