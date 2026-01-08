
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
            className="w-full h-full bg-cover bg-center animate-ken-burns"
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop')",
            }}
        ></div>
        <div className="absolute inset-0 bg-stone-950/60"></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-[9rem] font-bold text-white mb-8 tracking-tighter leading-[0.9] select-none">
              <span className="block animate-blur-in delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                Katalog
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-handwriting italic animate-blur-in delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
                Azzahra
              </span>
            </h1>
            
            <div className="mt-10 mb-16 max-w-2xl mx-auto animate-blur-in delay-500 opacity-0" style={{animationFillMode: 'forwards'}}>
                 <p className="text-lg md:text-2xl text-white/70 font-serif-text font-light leading-relaxed italic">
                "Temukan harmoni rasa dalam setiap sajian makanan dan minuman spesial kami."
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-blur-in delay-700 opacity-0" style={{animationFillMode: 'forwards'}}>
                <button
                onClick={() => onNavigate('menu')}
                className="group relative px-10 py-4 bg-white text-stone-900 rounded-full font-black text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
                >
                    <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
                        Eksplor Menu
                        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                </button>
                
                <button
                onClick={() => onNavigate('promo')}
                className="group px-10 py-4 text-white border border-white/20 backdrop-blur-sm rounded-full hover:bg-white/10 transition-all font-bold text-sm uppercase tracking-widest"
                >
                    Promo Spesial
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
