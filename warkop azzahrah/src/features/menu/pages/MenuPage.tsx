import { useMemo, useState } from 'react';

import { useMenu } from '../../../app/MenuContext';
import { SITE_CONFIG } from '../../../config/site';
import { formatCompactPrice } from '../../../lib/format';
import { filterMenuItems } from '../../../lib/menu';
import { MenuFilter, MenuItem } from '../../../types/menu';
import ProductDetailModal from '../components/ProductDetailModal';

interface MenuPageProps {
  onNavigateHome: () => void;
}

const MENU_FILTERS: MenuFilter[] = ['all', 'beverage', 'food'];

const MenuPage = ({ onNavigateHome }: MenuPageProps) => {
  const { menuItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery,
        type: activeFilter,
        includeDescription: true,
      }),
    [activeFilter, menuItems, searchQuery],
  );

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isEven = index % 2 === 0;

    return (
      <div
        key={item.id}
        className="animate-item"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div
          className={`flex items-center gap-4 py-8 sm:gap-12 sm:py-16 ${
            isEven ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <div
            className={`w-[65%] space-y-2 sm:space-y-4 ${
              isEven ? 'text-left' : 'text-right'
            }`}
          >
            <div
              className={`flex items-center gap-3 sm:gap-6 ${
                isEven ? 'justify-start' : 'justify-end'
              }`}
            >
              <h3 className="text-base leading-tight font-extrabold tracking-tighter text-black uppercase sm:text-4xl">
                {item.name}
              </h3>
              {isEven && (
                <div className="price-circle">
                  {formatCompactPrice(item.price)}
                </div>
              )}
            </div>

            <p className="text-[11px] leading-snug font-semibold text-stone-800 sm:text-lg sm:leading-relaxed">
              {item.description}
            </p>

            {!isEven && (
              <div className="flex justify-end pt-1">
                <div className="price-circle">
                  {formatCompactPrice(item.price)}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedItem(item)}
              className="text-[9px] font-black tracking-widest text-stone-500 uppercase transition-colors hover:text-black sm:text-[10px]"
            >
              DETAILS -
            </button>
          </div>

          <div className="flex w-[35%] justify-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-xl sm:rounded-[3rem]">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="divider-line" />
      </div>
    );
  };

  return (
    <div className="bg-paper-premium min-h-screen pt-8 pb-20 text-black selection:bg-black selection:text-white sm:pt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <header className="mb-12 space-y-2 text-center sm:mb-32 sm:space-y-4">
          <h1 className="font-cursive py-2 text-6xl leading-none text-black sm:text-[120px]">
            Azzahra
          </h1>
          <div className="brush-banner">
            <h2 className="text-2xl leading-none font-black tracking-[0.15em] uppercase sm:text-6xl">
              Food Menu
            </h2>
          </div>

          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="flex gap-4">
              {MENU_FILTERS.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`border-b-2 pb-1 text-[9px] font-black tracking-[0.3em] uppercase transition-all sm:text-[11px] ${
                    activeFilter === type
                      ? 'border-black text-black'
                      : 'border-transparent text-stone-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="SEARCH MENU..."
              className="w-full max-w-[200px] border-b-2 border-stone-300 bg-transparent py-2 text-center text-[11px] font-bold tracking-widest text-black uppercase outline-none transition-all focus:border-black sm:text-sm"
            />
          </div>
        </header>

        <div className="space-y-2">
          {filteredItems.map((item, index) => renderMenuItem(item, index))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-cursive text-3xl text-stone-400">
              Nothing found...
            </p>
          </div>
        )}

        <footer className="mt-32 space-y-12 border-t-4 border-black pt-12">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
            <div>
              <h4 className="mb-4 text-[10px] font-black tracking-[0.4em] text-stone-400 uppercase">
                Location
              </h4>
              <p className="text-sm leading-tight font-extrabold sm:text-lg">
                {SITE_CONFIG.contact.address}
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-[10px] font-black tracking-[0.4em] text-stone-400 uppercase">
                Delivery Order
              </h4>
              <p className="text-sm leading-tight font-extrabold sm:text-lg">
                {SITE_CONFIG.contact.displayPhone}
              </p>
              <p className="mt-2 text-[10px] font-bold text-stone-400 italic">
                Tersedia untuk pesanan online
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-[10px] font-black tracking-[0.4em] text-stone-400 uppercase">
                Opening Hours
              </h4>
              <p className="text-sm leading-tight font-extrabold sm:text-lg">
                {SITE_CONFIG.contact.openingHours}
              </p>
              <p className="mt-2 text-[10px] font-bold text-stone-400 italic">
                {SITE_CONFIG.contact.openingDays}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 border-t border-stone-200 pt-12 sm:flex-row">
            <p className="text-[11px] font-black tracking-[0.5em] text-black uppercase sm:text-sm">
              {SITE_CONFIG.websiteLabel}
            </p>
            <button
              onClick={onNavigateHome}
              className="rounded-lg bg-stone-900 px-10 py-4 text-[10px] font-black tracking-[0.2em] text-white uppercase shadow-xl transition-all hover:bg-black"
            >
              BACK TO WEBSITE
            </button>
          </div>
        </footer>
      </div>

      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default MenuPage;
