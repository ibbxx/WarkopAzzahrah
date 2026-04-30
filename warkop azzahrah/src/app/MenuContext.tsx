import { createContext, ReactNode, useContext, useMemo } from 'react';

import { MENU_ITEMS } from '../data/menu-data';
import { MenuItem } from '../types/menu';

interface MenuContextValue {
  menuItems: readonly MenuItem[];
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      menuItems: MENU_ITEMS,
    }),
    [],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};
