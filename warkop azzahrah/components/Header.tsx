
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang-kami', label: 'Cerita' },
    { id: 'menu', label: 'Menu' },
    { id: 'promo', label: 'Promo' },
    { id: 'kontak', label: 'Kontak' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-8 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto max-w-7xl">
        <div className={`transition-all duration-700 rounded-full border border-white/10 flex justify-between items-center text-white px-8 py-3 ${isScrolled ? 'bg-stone-950/90 backdrop-blur-xl shadow-2xl py-2.5 scale-[0.98]' : 'bg-transparent border-transparent'}`}>
            
            <button onClick={() => onNavigate('hero')} className="group flex flex-col items-start">
                <h1 className={`text-xl font-black font-serif tracking-tighter transition-all duration-500 ${isScrolled ? 'text-amber-400' : 'text-white text-2xl'}`}>
                    Warkop <span className="text-amber-500 italic">Azzahra</span>
                </h1>
            </button>

            <nav className="hidden md:flex space-x-10 items-center">
                {navLinks.map((link) => (
                <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className="relative group text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 hover:text-white transition-colors"
                >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
                ))}
            </nav>

            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 rounded-full bg-white/5"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>
        </div>
        
        {isMenuOpen && (
            <div className="mt-4 bg-stone-950/95 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden animate-blur-in">
                <nav className="flex flex-col p-4 space-y-2">
                    {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => { onNavigate(link.id); setIsMenuOpen(false); }}
                        className="w-full text-left px-6 py-4 text-lg font-bold text-white hover:bg-white/5 rounded-2xl"
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
