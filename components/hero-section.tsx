"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import OptimizedVideo from "./optimized-video"

const SweepLight = React.memo(() => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[20deg] pointer-events-none"
    initial={{ x: "-100%" }}
    variants={{ hover: { x: "100%" } }}
    transition={{ duration: 0.6 }}
  />
))
SweepLight.displayName = 'SweepLight'

const HeroSection = React.memo(({ onLoaded }: { onLoaded: () => void }) => {
  const [showLocation, setShowLocation] = useState(false)

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#08080a] px-6 py-10 font-sans">
      <OptimizedVideo 
        src="bgvid.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        preset="high"
        onLoadedData={onLoaded}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[#08080a]/80 z-10" />

      <div className="relative z-20 w-full max-w-[600px] flex flex-col items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="mb-10 w-full flex justify-center">
          <img src="logo.png" alt="Logo" style={{ width: "900px", maxWidth: "100%" }}/>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full mb-4 items-start">
          
          <div className="flex flex-col gap-2 w-full">
            <motion.button
              whileHover="hover"
              onClick={() => setShowLocation(!showLocation)}
              className="relative cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all w-full h-[180px]"
            >
              <SweepLight />
              <span className="text-[#4fae79] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">LOCAȚIE</span>
              <h2 className="text-white text-[28px] font-semibold">Nicolae Iorga 52</h2>
            </motion.button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showLocation ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"}`}>
              <a href="https://www.google.com/maps/dir//Golden+Studio,+Strada+Nicolae+Iorga+52,+550361+Sibiu/@45.7809652,24.1565515,18.25z/data=!4m17!1m7!3m6!1s0x474c5dcb4351d831:0xc14a499e9b45477f!2sGolden+Studio!8m2!3d45.7811232!4d24.1573543!16s%2Fg%2F11y3sg3bcr!4m8!1m0!1m5!1m1!1s0x474c5dcb4351d831:0xc14a499e9b45477f!2m2!1d24.1573543!2d45.7811232!3e0?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="relative block w-full cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[1.5rem] hover:border-white/20 transition-all">
                <SweepLight />
                <div className="py-4 flex items-center justify-center text-white text-sm font-bold">
                  Vezi pe Google Maps
                </div>
              </a>
            </div>
          </div>

          <motion.button
            whileHover="hover"
            onClick={() => window.open("tel:+40774948646", "_self")}
            className="relative cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all w-full h-[180px]"
          >
            <SweepLight />
            <span className="text-[#E1BC4C] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">CONTACT</span>
            <h2 className="text-white text-[28px] md:text-[28px] font-semibold tracking-tight mt-1">0774 948 646</h2>
          </motion.button>
        </div>

        <motion.button 
          whileHover="hover"
          onClick={() => window.open("https://mero.ro/p/golden-studio", "_blank")}
          className="relative cursor-pointer overflow-hidden w-full bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center justify-center text-center hover:border-white/20 transition-all"
        >
          <SweepLight />
          <span className="text-[#2C7BDB] text-[11px] font-bold uppercase tracking-[0.2em] mb-2 z-10">PROGRAMEAZA-TE ACUM</span>
          <h2 className="text-white text-[28px] font-bold z-10">Parteneri MERO</h2>
        </motion.button>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection