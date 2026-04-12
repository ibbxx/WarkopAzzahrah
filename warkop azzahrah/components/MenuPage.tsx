import React, { useMemo, useState, useEffect } from 'react';
import { useMenu } from '../MenuContext';
import { CoffeeItem } from '../types';
import ProductDetailModal from './ProductDetailModal';

interface MenuPageProps {
  onNavigateHome: () => void;
}

type MenuFilter = 'all' | 'beverage' | 'food';

const phoneNumber = '62085256669994';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=Halo%20Warkop%20Azzahra,%20saya%20ingin%20bertanya%20mengenai%20menu%20dan%20pemesanan.`;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const MenuPage: React.FC<MenuPageProps> = ({ onNavigateHome }) => {
  const { menuItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');
  const [selectedItem, setSelectedItem] = useState<CoffeeItem | null>(null);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeFilter === 'all' ? true : item.type === activeFilter;
      return matchesSearch && matchesType;
    });
  }, [activeFilter, menuItems, searchQuery]);

  const beverageItems = useMemo(() => filteredItems.filter((item) => item.type === 'beverage'), [filteredItems]);
  const foodItems = useMemo(() => filteredItems.filter((item) => item.type === 'food'), [filteredItems]);

  const renderProductCard = (item: CoffeeItem, index: number) => {
    return (
      <button
        key={item.id}
        onClick={() => setSelectedItem(item)}
        className="group animate-fade-up text-left"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-50 border border-stone-100 transition-all duration-300 group-hover:shadow-lg">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {item.category === 'best-seller' && (
            <div className="absolute left-3 top-3">
              <span className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-sm">
                Favorit
              </span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-900 leading-tight group-hover:text-amber-700 transition-colors">
              {item.name}
            </h3>
            <span className="shrink-0 text-sm font-bold text-stone-900">{formatCurrency(item.price)}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-stone-500 leading-relaxed">
            {item.description}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-stone-900 selection:text-white pb-32">
      {/* Centered Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl bg-stone-100">
                <img src="/favicon.jpg" alt="Logo" className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg font-black tracking-tight leading-none">WARKOP AZZAHRA</h1>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Digital Menu Catalog</span>
              </div>
           </div>
           <button
             onClick={onNavigateHome}
             className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
           >
             Beranda
           </button>
        </div>
      </nav>


      <div className="max-w-5xl mx-auto px-4 pt-16">
        {/* Simple Search & Filter */}
        <section className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-black mb-6">Menu Pilihan Kami</h2>
           <div className="max-w-2xl mx-auto">
             <div className="relative mb-6">
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Cari menu..."
                 className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-center outline-none focus:border-stone-300 transition-all"
               />
             </div>
             <div className="flex justify-center flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Semua' },
                  { key: 'beverage', label: 'Minuman' },
                  { key: 'food', label: 'Makanan' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key as MenuFilter)}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                      activeFilter === tab.key 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
             </div>
           </div>
        </section>

        {/* Clean Grid Sections */}
        <div className="space-y-24">
          {(activeFilter === 'all' || activeFilter === 'beverage') && beverageItems.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                 <h3 className="text-xl font-bold uppercase tracking-widest">Minuman</h3>
                 <div className="flex-grow h-px bg-stone-100" />
                 <span className="text-[10px] font-bold text-stone-400">{beverageItems.length} Items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {beverageItems.map((item, idx) => renderProductCard(item, idx))}
              </div>
            </section>
          )}

          {(activeFilter === 'all' || activeFilter === 'food') && foodItems.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                 <h3 className="text-xl font-bold uppercase tracking-widest">Makanan</h3>
                 <div className="flex-grow h-px bg-stone-100" />
                 <span className="text-[10px] font-bold text-stone-400">{foodItems.length} Items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {foodItems.map((item, idx) => renderProductCard(item, idx))}
              </div>
            </section>
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-32 text-center opacity-40">
            <h3 className="text-xl font-bold">Menu tidak ditemukan.</h3>
            <p className="mt-2 text-sm">Coba kata kunci pencarian yang lain.</p>
          </div>
        )}
      </div>

      {/* Simplified WhatsApp Action */}
      <div className="fixed inset-x-0 bottom-10 z-[60] flex justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-stone-900 text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl transition hover:scale-105 active:scale-95"
        >
          Pesan via WhatsApp
        </a>
      </div>

      <ProductDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default MenuPage;
