
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CoffeeItem } from './types';
import { MENU_ITEMS } from './constants';

interface MenuContextType {
  menuItems: CoffeeItem[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems] = useState<CoffeeItem[]>(MENU_ITEMS);

  return (
    <MenuContext.Provider value={{ menuItems }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
