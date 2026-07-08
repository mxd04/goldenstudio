"use client"

import React from "react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-20 pb-10 px-6 flex flex-col items-center justify-center overflow-visible select-none">

      {/* SECTIUNEA DE LINKURI SOCIALE SI UTILE */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-8 text-[15px] font-medium text-zinc-400">
        <Link href="https://mero.ro/p/golden-studio" target="_blank" className="hover:text-[#edcd7f] transition-colors duration-200 cursor-pointer">
          MERO
        </Link>
        <Link href="https://www.instagram.com/goldenstudio.cs?igsh=a3k5bTBpOGZ0ZHRr" target="_blank" className="hover:text-[#edcd7f] transition-colors duration-200 cursor-pointer">
          INSTAGRAM
        </Link>
        <Link href="https://reclamatiisal.anpc.ro/" target="_blank" className="hover:text-[#edcd7f] transition-colors duration-200 cursor-pointer">
          ANPC - SAL
        </Link>
        <Link href="https://anpc.ro" target="_blank" className="hover:text-[#edcd7f] transition-colors duration-200 cursor-pointer">
          ANPC
        </Link>
      </div>

      {/* DREPTURI DE AUTOR & BRANDING */}
      <div className="text-center text-[14px] text-zinc-600 font-medium tracking-wide">
        © <span className="text-[#edcd7f]">Golden Studio.</span> Toate drepturile rezervate 2026.
      </div>

    </footer>
  )
}

export default React.memo(Footer)