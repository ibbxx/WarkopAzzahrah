import { useMemo, useState } from 'react';

import { useMenu } from '../../../app/MenuContext';
import { filterMenuItems } from '../../../lib/menu';
import { MenuItem, MenuType } from '../../../types/menu';
import MenuCard from '../../menu/components/MenuCard';
import ProductDetailModal from '../../menu/components/ProductDetailModal';

const MenuPreview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<MenuType>('beverage');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { menuItems } = useMenu();

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery,
        type: activeType,
      }),
    [menuItems, activeType, searchQuery],
  );

  return (
    <section id="menu" className="relative overflow-hidden bg-[#fffaf5] py-24">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="mb-12 text-center animate-blur-in">
          <p className="mb-4 text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase">
            Daftar Pilihan
          </p>
          <h2 className="text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
            Katalog{' '}
            <span className="font-serif font-normal text-stone-500 italic">
              Menu
            </span>
          </h2>
        </div>

        <div className="mb-12 flex justify-center animate-blur-in">
          <div className="inline-flex rounded-[2rem] bg-stone-100 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveType('beverage')}
              className={`flex items-center gap-3 rounded-full px-10 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${
                activeType === 'beverage'
                  ? 'scale-105 bg-white text-stone-900 shadow-lg'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v1m0 16h.01M4.929 4.929l.707.707m12.728 0l.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7V3"
                />
              </svg>
              Minuman
            </button>
            <button
              onClick={() => setActiveType('food')}
              className={`flex items-center gap-3 rounded-full px-10 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${
                activeType === 'food'
                  ? 'scale-105 bg-white text-stone-900 shadow-lg'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 01-1.5-.454M9 16v2m3-6v6m3-8v8m-7-1h10a1 1 0 011 1v2H5v-2a1 1 0 011-1z"
                />
              </svg>
              Makanan
            </button>
          </div>
        </div>

        <div className="mx-auto mb-16 max-w-xl animate-blur-in delay-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Cari ${
                activeType === 'beverage' ? 'minuman' : 'makanan'
              }...`}
              className="font-serif-text w-full rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-sm transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-500/5 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              onViewDetail={setSelectedItem}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="animate-blur-in rounded-[2.5rem] border border-stone-100 bg-stone-50 py-20 text-center">
            <p className="font-serif text-lg text-stone-400 italic">
              Menu tidak ditemukan.
            </p>
          </div>
        )}
      </div>

      <ProductDetailModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};

export default MenuPreview;
