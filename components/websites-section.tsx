"use client"

import React, { useRef, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import FadeIn from './fade-in';

// ==========================================
// UTILS PARSING PENTRU BORDER GLOW ENGINE
// ==========================================
function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

// ==========================================
// COMPONENTA BORDER GLOW CORUPTĂ ANTERIOR
// ==========================================
interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
}

const BorderGlow: React.FC<BorderGlowProps> = React.memo(({
  children,
  className = '',
  edgeSensitivity = 45,
  glowColor = '270 100 60',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 30,
  colors = ['#8400FF', '#f472b6', '#38bdf8'],
  fillOpacity = 0.7,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;

    let kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
    let ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
    card.style.setProperty('--cursor-angle', `${degrees.toFixed(3)}deg`);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity.toString(),
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread.toString(),
        '--fill-opacity': fillOpacity.toString(),
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
});

BorderGlow.displayName = 'BorderGlow';

// ==========================================
// VARIANTE ANIMAȚII STELE (STRICT TYPED)
// ==========================================
const starContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Creează efectul secvențial "pe rând"
      delayChildren: 0.1
    }
  }
};

const singleStarVariants: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0 
  },
  visible: { 
    scale: [0, 1.4, 1], // Animație tip pop/bounce elastică inovativă
    opacity: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 200, 
      damping: 12 
    }
  }
};

// ==========================================
// RECENZII GENERATE REALIST DUPĂ MERO
// ==========================================
const row1Reviews = [
  { id: 1, name: "Andrei M.", text: "Cel mai bun tuns din Sibiu! Atenția la detalii este incredibilă, iar atmosfera din studio te face să te simți super relaxat."},
  { id: 2, name: "Elena R.", text: "Personal extrem de profesionist. Au înțeles exact ce îmi doream de la culoare și tunsoare. Recomand cu toată încrederea!"},
  { id: 3, name: "Mihai T.", text: "Sunt client fidel de peste un an. Serviciile sunt mereu la cel mai înalt nivel, iar punctualitatea este impecabilă pe Mero."},
  { id: 4, name: "Vlad B.", text: "Un studio premium adevărat. Nota 10 pentru curățenie, muzică și, bineînțeles, frizerie. Merită fiecare leu."}
];

const row2Reviews = [
  { id: 5, name: "Bogdan S.", text: "Foarte ușor de programat prin aplicație. Serviciul a început fix la minut, iar rezultatul este perfect ca de fiecare dată.",},
  { id: 6, name: "Darius N.", text: "Oameni super pasionați de ceea ce fac. Nu este doar un simplu tuns, este artă. Recomand Golden Studio!"},
  { id: 7, name: "Cristian V.", text: "Conturul de barbă cu briciul și prosoapele calde au fost o experiență de tip ritual de relaxare absolut excepțională.", },
  { id: 8, name: "Marius P.", text: "Atmosferă premium, oameni faini și un vibe cum nu mai găsești în altă parte. Nota 10 cu felicitări!",},
];

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="relative w-full bg-[#0a0a0a] py-28 overflow-hidden border-t border-white/5">
      
      {/* GLOW DE FUNDAL DECORATIV */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8400FF]/5 blur-[160px] pointer-events-none rounded-full" />

      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col items-center text-center px-6 mb-24 relative z-10">
        

        {/* TITLU */}
        <FadeIn type="up">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-[1050px]">
            Standardul excelenței, confirmat de peste <br />
            <span className="shiny-text-effect">5.000 de experiențe</span>
          </h2>
        </FadeIn>
      </div>

      {/* ENGINE-UL CARUSELULUI INFINIT (BORDURILE NU MAI SUNT STRUCTURATE PRIN MOTION PENTRU A EVITA BLOCAREA) */}
      <div className="flex flex-col gap-6 relative z-10 w-full overflow-hidden mask-gradient-edges">
        
        {/* RÂNDUL 1: SE MIȘCĂ SPRE STÂNGA */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-left gap-6 px-3 flex">
            {/* Setul 1 */}
            {row1Reviews.map((review) => (
              <BorderGlow key={`r1-orig-${review.id}`} borderRadius={24} backgroundColor="#110d1a">
                <div className="w-[350px] md:w-[400px] p-6 flex flex-col justify-between hxl h-[210px] text-left select-none">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-base">{review.name}</h4>
                      <div className="flex items-center gap-0.5 opacity-80">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-3 font-normal leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">Verificat Mero</span>
                  </div>
                </div>
              </BorderGlow>
            ))}
            {/* Setul 2 (Duplicat exact pentru continuitate infinită) */}
            {row1Reviews.map((review) => (
              <BorderGlow key={`r1-dup-${review.id}`} borderRadius={24} backgroundColor="#110d1a">
                <div className="w-[350px] md:w-[400px] p-6 flex flex-col justify-between h-[210px] text-left select-none">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-base">{review.name}</h4>
                      <div className="flex items-center gap-0.5 opacity-80">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-3 font-normal leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">Verificat Mero</span>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>

        {/* RÂNDUL 2: SE MIȘCĂ SPRE DREAPTA */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-right gap-6 px-3 flex">
            {/* Setul 1 */}
            {row2Reviews.map((review) => (
              <BorderGlow key={`r2-orig-${review.id}`} borderRadius={24} backgroundColor="#110d1a" colors={['#38bdf8', '#8400FF', '#c084fc']} glowColor="200 100 60">
                <div className="w-[350px] md:w-[400px] p-6 flex flex-col justify-between h-[210px] text-left select-none">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-base">{review.name}</h4>
                      <div className="flex items-center gap-0.5 opacity-80">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-3 font-normal leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">Verificat Mero</span>
                  </div>
                </div>
              </BorderGlow>
            ))}
            {/* Setul 2 (Duplicat) */}
            {row2Reviews.map((review) => (
              <BorderGlow key={`r2-dup-${review.id}`} borderRadius={24} backgroundColor="#110d1a" colors={['#38bdf8', '#8400FF', '#c084fc']} glowColor="200 100 60">
                <div className="w-[350px] md:w-[400px] p-6 flex flex-col justify-between h-[210px] text-left select-none">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-base">{review.name}</h4>
                      <div className="flex items-center gap-0.5 opacity-80">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-3 font-normal leading-relaxed">"{review.text}"</p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">Verificat Mero</span>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>

      </div>

      {/* GRADIENT MASK PE MARGINI PENTRU DISPARIȚIE SUBTILĂ */}
      <style jsx global>{`
        .mask-gradient-edges {
          mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
        }
      `}</style>

    </section>
  );
}