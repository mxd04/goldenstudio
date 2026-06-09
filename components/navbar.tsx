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

  // Logica: Navbar-ul apare după ~120px-220px de scroll
  const opacity = useTransform(scrollY, [120, 220], [0, 1])
  const y = useTransform(scrollY, [120, 220], [-30, 0])
  const scale = useTransform(scrollY, [120, 220], [0.92, 1])

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
            onClick={() => window.open("https://www.google.com/maps/dir/45.7703424,24.1631232/45.7806845,24.1568355/@45.780354,24.1565915,18.25z/data=!4m5!4m4!1m1!4e1!1m0!3e0?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D", "_blank")} 
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