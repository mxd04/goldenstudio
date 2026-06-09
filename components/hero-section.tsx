"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        onLoadedData={onLoaded}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ willChange: 'transform' }}
      >
        <source src="bgvid.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute top-0 left-0 w-full h-full bg-[#08080a]/80 z-10" />

      <div className="relative z-20 w-full max-w-[600px] flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 2 }} 
          className="mb-10 w-full flex justify-center"
        >
          <img src="logo.png" alt="Logo" style={{ width: "900px", maxWidth: "100%" }}/>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover="hover"
              onClick={() => setShowLocation(!showLocation)}
              className="relative cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/10 transition-all"
            >
              <SweepLight />
              <div className="mb-6"><MapIcon /></div>
              <span className="text-[#4fae79] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">LOCAȚIE</span>
              <h2 className="text-white text-[28px] font-semibold">Nicolae Iorga 52</h2>
            </motion.button>

            {/* TRANZIȚIE CSS OPTIMIZATĂ - FĂRĂ LAG */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showLocation ? "max-h-[100px] opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <a
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full relative cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[1.5rem] hover:border-white/20 transition-all"
              >
                <div className="py-4 px-6 flex items-center justify-center gap-2 text-white text-sm font-bold">
                  <MapIcon />
                  Vezi pe Google Maps
                </div>
              </a>
            </div>
          </div>

          <motion.button
            whileHover="hover"
            onClick={() => window.open("tel:+40774948646", "_self")}
            className="relative cursor-pointer overflow-hidden bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/10 transition-all"
          >
            <SweepLight />
            <div className="mb-6"><PhoneIcon /></div>
            <span className="text-[#E1BC4C] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">CONTACT TELEFONIC</span>
            <h2 className="text-white text-[23px] md:text-[25px] font-semibold tracking-tight mt-1">0774 948 646</h2>
          </motion.button>
        </div>

        <motion.button 
          whileHover="hover"
          onClick={() => window.open("https://mero.ro/p/golden-studio", "_blank")}
          className="relative cursor-pointer overflow-hidden w-full bg-black/5 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/20 transition-all"
        >
          <SweepLight />
          <div className="mb-6 z-10">
            <div className="w-12 h-12 rounded-[2rem] bg-gradient-to-br from-[#2C7BDB] to-[#1a4e99] flex items-center justify-center font-bold text-white text-sm">M</div>
          </div>
          <span className="text-[#2C7BDB] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 z-10">PROGRAMEAZA-TE ACUM</span>
          <h2 className="text-white text-[28px] font-bold z-10">Parteneri MERO</h2>
        </motion.button>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection

function MapIcon() { return <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
function PhoneIcon() { return <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> }