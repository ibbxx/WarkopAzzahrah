import { useEffect, useRef, useState } from 'react';

import { SectionId } from '../../../types/app';

interface HeroProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-stone-900"
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="h-full w-full animate-ken-burns bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-stone-950/60" />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-6xl font-bold leading-[0.9] tracking-tighter text-white select-none md:text-[9rem]">
            <span
              className="block animate-blur-in opacity-0 delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              Warkop
            </span>
            <span
              className="font-handwriting block animate-blur-in bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent italic opacity-0 delay-300"
              style={{ animationFillMode: 'forwards' }}
            >
              Azzahra
            </span>
          </h1>

          <div
            className="mx-auto mt-10 mb-16 max-w-2xl animate-blur-in opacity-0 delay-500"
            style={{ animationFillMode: 'forwards' }}
          >
            <p className="font-serif-text text-lg leading-relaxed text-white/70 italic md:text-2xl">
              &quot;Temukan harmoni rasa dalam setiap sajian makanan dan minuman
              spesial kami.&quot;
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-6 animate-blur-in opacity-0 delay-700 sm:flex-row"
            style={{ animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => onNavigate('menu')}
              className="group relative overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-black text-stone-900 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
                Eksplor Menu
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>

            <button
              onClick={() => onNavigate('promo')}
              className="rounded-full border border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10"
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
