import { useEffect, useState } from 'react';

import { HOME_NAV_LINKS } from '../../config/navigation';
import { SectionId } from '../../types/app';

interface HeaderProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-full border border-white/10 px-8 py-3 text-white transition-all duration-700 ${
            isScrolled
              ? 'scale-[0.98] bg-stone-950/90 py-2.5 shadow-2xl backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button
            onClick={() => onNavigate('hero')}
            className="group flex flex-col items-start"
          >
            <h1
              className={`font-serif text-xl font-black tracking-tighter transition-all duration-500 ${
                isScrolled ? 'text-amber-400' : 'text-2xl text-white'
              }`}
            >
              Warkop <span className="italic text-amber-500">Azzahra</span>
            </h1>
          </button>

          <nav className="hidden items-center space-x-10 md:flex">
            {HOME_NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="group relative text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen((current) => !current)}
            className="rounded-full bg-white/5 p-2 md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 animate-blur-in overflow-hidden rounded-3xl border border-white/10 bg-stone-950/95 backdrop-blur-3xl">
            <nav className="flex flex-col space-y-2 p-4">
              {HOME_NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-2xl px-6 py-4 text-left text-lg font-bold text-white hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
