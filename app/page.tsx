"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import VideoCarousel from "@/components/video-carousel"
import ClothingSection from "@/components/clothing-section"
import WebsitesSection from "@/components/websites-section"
import Footer from "@/components/footer"

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