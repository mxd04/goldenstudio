"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"

// Lazy load components that are below the fold
const VideoCarousel = dynamic(() => import("@/components/video-carousel"), {
  loading: () => <div className="h-screen bg-[#0a0a0a]" />,
})

const WebsitesSection = dynamic(() => import("@/components/websites-section"), {
  loading: () => <div className="h-screen bg-[#0a0a0a]" />,
})

const ClothingSection = dynamic(() => import("@/components/clothing-section"), {
  loading: () => <div className="h-screen bg-[#0a0a0a]" />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-20 bg-[#0a0a0a]" />,
})

export default function Home() {

  return (
    <SmoothScrollProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />

        <main>
          <HeroSection onLoaded={() => {}} />
          <VideoCarousel />
          <WebsitesSection />
          <ClothingSection />
          <Footer />
        </main>
      </motion.div>
    </SmoothScrollProvider>
  )
}