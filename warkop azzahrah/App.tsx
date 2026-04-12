
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Promotions from './components/Promotions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import { MenuProvider } from './MenuContext';

type AppPath = '/' | '/menu';

const normalizePath = (pathname: string): AppPath => {
  const trimmedPath = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  return trimmedPath === '/menu' ? '/menu' : '/';
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<AppPath>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = currentPath === '/menu'
      ? 'Menu Digital | Warkop Azzahra'
      : 'Warkop Azzahra - Nikmati Kopi Terbaik';
  }, [currentPath]);

  const navigateToPath = (path: AppPath) => {
    if (currentPath === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleScrollTo = (id: string) => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');

      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MenuProvider>
      {currentPath === '/menu' ? (
        <MenuPage onNavigateHome={() => navigateToPath('/')} />
      ) : (
        <div className="bg-[#fffaf5] text-stone-800 font-sans min-h-screen">
          <Header onNavigate={handleScrollTo} />
          <main>
            <Hero onNavigate={handleScrollTo} />
            <About />
            <Menu />
            <Promotions onNavigate={handleScrollTo} />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </MenuProvider>
  );
};

export default App;
