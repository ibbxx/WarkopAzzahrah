
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Promotions from './components/Promotions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MenuProvider } from './MenuContext';

const App: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MenuProvider>
      <div className="bg-[#fffaf5] text-stone-800 font-sans min-h-screen">
        <Header onNavigate={handleScrollTo} />
        <main>
          <Hero onNavigate={handleScrollTo} />
          <About />
          <Menu />
          <Promotions onNavigate={handleScrollTo}/>
          <Contact />
        </main>
        <Footer />
      </div>
    </MenuProvider>
  );
};

export default App;
