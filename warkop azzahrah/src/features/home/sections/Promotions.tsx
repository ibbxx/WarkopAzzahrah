import { useRef } from 'react';

import { PROMOTIONS_LIST } from '../../../data/menu-data';
import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';
import { SectionId } from '../../../types/app';

interface PromotionsProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Promotions = ({ onNavigate }: PromotionsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(sectionRef);

  return (
    <section
      id="promo"
      ref={sectionRef}
      className="relative overflow-hidden bg-stone-950 py-32"
    >
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="animate-float-gentle absolute -top-[20%] left-[20%] h-[800px] w-[800px] rounded-full bg-amber-900/10 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center animate-blur-in">
          <span className="mb-4 block text-xs font-bold tracking-[0.4em] text-amber-500 uppercase">
            Limited Offers
          </span>
          <h2 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            Curated <span className="text-stone-600 italic">Promotions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROMOTIONS_LIST.map((promo, index) => (
            <div
              key={promo.id}
              className={`group relative h-[450px] cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => onNavigate('menu')}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="h-full w-full animate-ken-burns object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-[10px]">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-serif text-3xl font-bold text-white transition-colors group-hover:text-amber-200">
                    {promo.title}
                  </h3>
                  <span className="rounded-full bg-amber-600 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    Promo
                  </span>
                </div>

                <p className="mb-6 line-clamp-2 text-base leading-relaxed text-stone-300 transition-all group-hover:line-clamp-none">
                  {promo.description}
                </p>

                <div className="flex items-center gap-3">
                  <span className="border-b border-white/20 pb-1 text-xs font-bold tracking-widest text-white/60 uppercase transition-all group-hover:border-amber-400 group-hover:text-amber-400">
                    Claim Offer
                  </span>
                  <svg
                    className="h-4 w-4 text-white/60 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
