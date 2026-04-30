import { useEffect, useState } from 'react';

import { SITE_CONFIG } from '../config/site';
import { AppPath, SectionId } from '../types/app';

const normalizePath = (pathname: string): AppPath => {
  const trimmedPath =
    pathname.endsWith('/') && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  return trimmedPath === '/menu' ? '/menu' : '/';
};

const scrollToSection = (sectionId: SectionId) => {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const useAppNavigation = () => {
  const [currentPath, setCurrentPath] = useState<AppPath>(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title =
      currentPath === '/menu'
        ? SITE_CONFIG.titles.menu
        : SITE_CONFIG.titles.home;
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

  const navigateToSection = (sectionId: SectionId) => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');

      requestAnimationFrame(() => scrollToSection(sectionId));
      return;
    }

    scrollToSection(sectionId);
  };

  return {
    currentPath,
    navigateToPath,
    navigateToSection,
  };
};
