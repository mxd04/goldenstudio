"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

// --- DATELE ORIGINALE ---
const reviews = [
  { name: "Bogdan Adrian P.", text: "Excelentă performanță, primire și ambient plăcut și parcursul procesului foarte plăcut…!🌟❤️ RECOMAND!"},
  { name: "Mario J.", text: "Ac.Andrei este un frizer foarte bun și profesional, recomand cu încredere!!!"},
  { name: "Gheorghiță Lucian M.", text: "Servicii rapide, personal profesionist și rezultat foarte bun. Recomand."},
  { name: "Alin V.", text: "Cel mai bun deyu 🔥🔥🔥"},
  { name: "Petru C.", text: "Superb, foarte multumit"},
  { name: "Eduard D.", text: "Mihai un frizer foarte atent la detalii"},
  { name: "Darius S.", text: "Experiență foarte bună la Andrei Aconstantinesei băiat de nota 10 .recomand!!"},
  { name: "Mihai S.", text: "O experiență foarte bună, ma tund la Mihai de câteva luni și mereu a fost foarte atent la detalii, este foarte amabil, ii o atmosfera foarte relaxantă și super amabili si restul băieților."},
  { name: "Cristian B.", text: "Am avut o experiență foarte bună la Andrei Aconstantinesei! Este un frizer foarte atent la detalii, profesionist și mereu se asigură că pleci mulțumit. Îți oferă sfaturi bune legate de stilul care ți se potrivește și lucrează cu multă răbdare și precizie. Atmosfera este plăcută și te simți relaxat pe tot parcursul tunsului. Recomand cu încredere!"},
  { name: "Răzvan Andrei P.", text: "Serviciu excelent! Fane foarte atent la detalii și foarte profesionist.Recomand cu încredere!"},
  { name: "Andrei D.", text: "E top Mihai. Recomand cu drag!🥇"},
  { name: "A B.", text: "Din întâmplare am ajuns la Deyu si sunt foarte mulțumit! Răbdător și atent la detalii! Recomand!!!"},
  { name: "Panda R.", text: "Aveam un nunta pe weekend, am zis ca vreau o tunsoara simpla, dupa ce am plecat, m-o sunat mireasa ca vrea sa fac schimb cu mirele"},
  { name: "Emi M.", text: "Narcisa e o fată super de treabă! Recomand cu drag!"},
  { name: "Raul C.", text: "Foarte mulțumit, recomand cu toată încrederea!🔥"},
  { name: "Mihmea R.", text: "Recomand cu mare încredere! Am fost la Mario Cristea și am primit exact tunsoarea pe care o doream. Atenție sporită la detalii, produse de calitate și o atmosferă foarte relaxată. Cu siguranță voi reveni!"},
  { name: "Darius G.", text: "Un hairstylist de calitate care nu doar tunde perfect dar ofera si o atmosfera foarte frumoasa. Mihai Hanea cel mai devotat hairstylist ."},
  { name: "Maria M.", text: "Are foarte multă răbdare prietenos și liniștit. M-a și spălat pe cap înainte chiar dacă am plătit doar tunsul. Se vede ca e bun și știe ce face! Recomand cu drag!"},
  { name: "Patrik S.", text: "Cel mai top salon, Mișu on top!!!"},
  { name: "Dario F.", text: "Serviciu top, atenție la detalii și talent deplin!"},
  { name: "Luca C.", text: "Cea mai tare frizerie din Sibiu recomand cu toată inima"},
  { name: "Andrei Mihai B.", text: "O experiență foarte plăcută. Servicii de calitate și o atmosferă relaxantă. Recomand cu încredere! 🫂🤩"},
  { name: "Victor D.", text: "cel mai bun din oras recomand"},
  { name: "Silviu N.", text: "Foarte atent la detalii, răspunde cerințelor clientului și foarte răbdător. Nu se grăbește. Recomand"},
  { name: "Vlad N.", text: "Servicii top, personal minunat și un vibe deosebit Recomand cu cea mai mare încredere"},
  { name: "Alexandra T.", text: "cea mai frumoasa ma simt dupa ce ies de la tuns de la Mihai! serviciu excelent, calitate superioara si produse premium. mergeti la tuns la Mihai daca vreti sa aratati bomba!!!"},
  { name: "Cezar F.", text: "Serviciu de top 🙌🏻"},
  { name: "Szucs T.", text: "Super servicii, persoana de 5 stele, om cu rabdare, nu se grabeste, super multumit!"},
  { name: "Bogdan C.", text: "Tuns fin,mâna grea pe stil , intri simplu și ieși șmecher ⭐️⭐️⭐️⭐️⭐️😎"},
  { name: "Sasu E.", text: "Super profesionalism, servicii de inalt nivel , recomand cu incredere 😁💪"},
  { name: "Daniel S.", text: "Cel mai top frizer ❤️❤️❤️"},
  { name: "Andrei D.", text: "Cel mai bun din Sibiu! Recomand Mario!!"},
  { name: "Vlad H.", text: "Mă tund la Mario săptămânal și de fiecare dată plec super mulțumit. Este atent la detalii, profesionist și știe exact ce ți se potrivește. Recomand cu toată încrederea!🔝🔝🔝"},
  { name: "Gabi B.", text: "Stefan este cel mai bun frizer. Mereu profesionist, atent și rezultatul este impecabil. Recomand cu încredere!"},
  { name: "Daniel L.", text: "De departe cel mai bun din Sibiu. Recomand!!!"},
  { name: "Juan C.", text: "Cel mai bun frizer și rapid 🔝"},
  { name: "Tony T.", text: "⭐️⭐️⭐️⭐️⭐️ Am avut o experiență excelentă! Tunsul a ieșit exact cum mi-am dorit, cu mare atenție la detalii și sfaturi profesionale despre cum să îmi aranjez părul. Atmosfera a fost foarte plăcută, relaxantă și primitoare. Se vede că există multă pricepere și pasiune pentru ceea ce fac. Recomand cu încredere și sigur voi reveni!"}

];

// --- CARDUL DE RECENZIE (Design Original) ---
const ReviewCard = ({ review }: { review: any }) => (
  <div className="w-[350px] md:w-[400px] p-6 mx-4 bg-[#110d1a] border border-white/5 rounded-[24px] flex flex-col justify-between h-[210px] text-left select-none flex-shrink-0">
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
);

export default function WebsitesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animate = () => {
    // Don't animate on mobile to save battery
    if (isMobile) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!isDragging.current && containerRef.current && isVisible) {
      scrollPos.current -= 0.65;
      const maxScroll = containerRef.current.scrollWidth / 3;
      if (Math.abs(scrollPos.current) >= maxScroll) scrollPos.current = 0;
      containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
      else setIsVisible(false); // Stop animation when not visible
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile, isVisible]);

  return (
    <section id="reviews-section" ref={sectionRef} className="relative w-full bg-[#0a0a0a] py-28 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8400FF]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="flex flex-col items-center text-center px-6 mb-24">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-[1050px]">
            Standardul excelenței, confirmat de peste <br />
            <span className="shiny-text-effect">5.000 de exeperiente</span>.
          </h2>
        </div>

        <div 
          className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] py-6 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => { isDragging.current = true; startX.current = e.clientX - scrollPos.current; }}
          onMouseMove={(e) => { 
            if (!isDragging.current || !containerRef.current) return;
            scrollPos.current = e.clientX - startX.current;
            containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
          }}
          onMouseUp={() => isDragging.current = false}
          onMouseLeave={() => isDragging.current = false}
          onTouchStart={(e) => { isDragging.current = true; startX.current = e.touches[0].clientX - scrollPos.current; }}
          onTouchMove={(e) => {
            if (!isDragging.current || !containerRef.current) return;
            scrollPos.current = e.touches[0].clientX - startX.current;
            containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
          }}
          onTouchEnd={() => isDragging.current = false}
        >
          <div ref={containerRef} className="flex will-change-transform items-stretch">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}