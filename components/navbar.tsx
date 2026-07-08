"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Phone, MapPin } from "lucide-react"

const SweepLight = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[20deg] pointer-events-none z-0"
    initial={{ x: "-100%" }}
    variants={{ hover: { x: "100%" } }}
    transition={{ duration: 0.6 }}
  />
)

const FloatingNavbar = () => {
  const { scrollY } = useScroll()
  const [showToast, setShowToast] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Logica: Navbar-ul apare după ~120px-220px de scroll
  const opacity = useTransform(scrollY, [120, 220], [0, 1])
  const y = useTransform(scrollY, [120, 220], isMobile ? [0, 0] : [-30, 0]) // Disable translate on mobile
  const scale = useTransform(scrollY, [120, 220], isMobile ? [1, 1] : [0.92, 1]) // Disable scale on mobile

  // Logica: Toast-ul apare doar când intri pe secțiunea de haircuts (o singură dată)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          setShowToast(true)
          setHasShown(true)
          setTimeout(() => setShowToast(false), 5000)
        }
      },
      { threshold: 0.3 }
    )

    const target = document.getElementById("haircuts-section")
    if (target) observer.observe(target)

    return () => { if (target) observer.unobserve(target) }
  }, [hasShown])

  return (
    <motion.div 
      style={{ opacity, y, scale }} 
      className="fixed top-4 md:top-6 left-0 right-0 z-[9999] px-3 md:px-6 pointer-events-none flex justify-center"
    >
      <div className="w-full max-w-7xl flex justify-between items-center">
        
        {/* LOGO - O idee mai mare pe mobil (h-[48px]) */}
        <div className="pointer-events-auto">
          <div className="h-[48px] md:h-[72px] px-4 md:px-6 rounded-[16px] md:rounded-[28px] bg-black/10 backdrop-blur-xl flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-6 md:h-10 w-auto object-contain" />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="relative flex items-center gap-2 md:gap-3 pointer-events-auto">
          
          {/* TOAST MESSAGE - Bounce pe tot DIV-ul */}
          <div className="absolute top-[120%] right-0 z-[10000] pointer-events-none">
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: [0, -10, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    y: { duration: 0.6, repeat: Infinity, repeatDelay: 0.5 },
                    opacity: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-r from-emerald-500/40 to-blue-500/40 backdrop-blur-md px-3 py-2 md:px-4 rounded-xl md:rounded-2xl shadow-2xl pointer-events-auto"
                >
                  <p className="text-[9px] md:text-[12px] text-white font-bold uppercase tracking-wider whitespace-nowrap">
                    Programează-te telefonic sau prin MERO
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BUTON TELEFON - Redimensionat la 48px pe mobile + Sweep Light */}
          <motion.button 
            whileHover="hover"
            onClick={() => window.location.href = "tel:+40774948646"} 
            className="relative overflow-hidden w-[48px] h-[48px] md:w-[62px] md:h-[62px] rounded-[16px] md:rounded-[24px] bg-black/10 backdrop-blur-xl flex items-center justify-center text-white cursor-pointer  active:scale-[0.97] transition-transform"
          >
            <SweepLight />
            <Phone size={18} className="relative z-10" />
          </motion.button>
          
          {/* BUTON LOCATIE - Redimensionat la 48px pe mobile + Sweep Light */}
          <motion.button 
            whileHover="hover"
            onClick={() => window.open("https://www.google.com/maps/dir//Golden+Studio,+Strada+Nicolae+Iorga+52,+550361+Sibiu/@45.7809652,24.1565515,18.25z/data=!4m17!1m7!3m6!1s0x474c5dcb4351d831:0xc14a499e9b45477f!2sGolden+Studio!8m2!3d45.7811232!4d24.1573543!16s%2Fg%2F11y3sg3bcr!4m8!1m0!1m5!1m1!1s0x474c5dcb4351d831:0xc14a499e9b45477f!2m2!1d24.1573543!2d45.7811232!3e0?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D", "_blank")} 
            className="relative overflow-hidden w-[48px] h-[48px] md:w-[62px] md:h-[62px] rounded-[16px] md:rounded-[24px] bg-black/10 backdrop-blur-xl flex items-center justify-center text-white cursor-pointer active:scale-[0.97] transition-transform"
          >
            <SweepLight />
            <MapPin size={18} className="relative z-10" />
          </motion.button>
          
          {/* BUTON MERO - Culoarea Gold a proiectului, redimensionat la 48px pe mobile + Sweep Light */}
          <motion.button 
            whileHover="hover"
            onClick={() => window.open("https://mero.ro/p/golden-studio", "_blank")} 
            className="relative overflow-hidden h-[48px] md:h-[62px] px-5 md:px-8 rounded-[16px] md:rounded-[24px] bg-[#edcd7f] text-black font-bold text-xs md:text-base cursor-pointer shadow-[0_4px_20px_rgba(237,205,127,0.15)] active:scale-[0.97] transition-all"
          >
            <SweepLight />
            <span className="relative z-10 tracking-wide">MERO</span>
          </motion.button>
        </div>
      </div>


      
    </motion.div>
  )
}

export default React.memo(FloatingNavbar)