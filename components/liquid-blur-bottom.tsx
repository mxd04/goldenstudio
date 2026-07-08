"use client"

export default function LiquidBlurBottom() {
  return (
    <>
      {/* Blur Liquid Container - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[500px] z-0 pointer-events-none overflow-hidden">
        {/* Main liquid blur gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#edcd7f]/30 via-[#edcd7f]/10 to-transparent"
          style={{
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(60px)',
          }}
        />
        
        {/* Multiple layered blur circles for liquid effect */}
        <div 
          className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(237,205,127,0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(237,205,127,0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        
        <div 
          className="absolute -bottom-24 right-1/3 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(237,205,127,0.15) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'float 12s ease-in-out infinite',
          }}
        />

        {/* Top to bottom gradient to fade blur smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-visible {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
