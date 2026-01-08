
import React, { useState, useMemo } from 'react';
import { useMenu } from '../MenuContext';
import MenuItem from './MenuItem';
import { CoffeeItem } from '../types';
import ProductDetailModal from './ProductDetailModal';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'beverage' | 'food'>('beverage');
  const [selectedItem, setSelectedItem] = useState<CoffeeItem | null>(null);
  const { menuItems } = useMenu();

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = item.type === activeType;
      return matchesType && (searchQuery.length > 0 ? matchesSearch : true);
    });
  }, [menuItems, activeType, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#fffaf5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        
        <div className="text-center mb-12 animate-blur-in">
            <p className="text-amber-600 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">Daftar Pilihan</p>
            <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
                Katalog <span className="font-serif italic font-normal text-stone-500">Menu</span>
            </h2>
        </div>

        {/* Pemisah Utama: Minuman & Makanan */}
        <div className="flex justify-center mb-12 animate-blur-in">
            <div className="inline-flex bg-stone-100 p-1.5 rounded-[2rem] shadow-inner">
                <button
                    onClick={() => setActiveType('beverage')}
                    className={`flex items-center gap-3 px-10 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
                        activeType === 'beverage'
                        ? 'bg-white text-stone-900 shadow-lg scale-105'
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v1m0 16h.01M4.929 4.929l.707.707m12.728 0l.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7V3" /></svg>
                    Minuman
                </button>
                <button
                    onClick={() => setActiveType('food')}
                    className={`flex items-center gap-3 px-10 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
                        activeType === 'food'
                        ? 'bg-white text-stone-900 shadow-lg scale-105'
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 01-1.5-.454M9 16v2m3-6v6m3-8v8m-7-1h10a1 1 0 011 1v2H5v-2a1 1 0 011-1z" /></svg>
                    Makanan
                </button>
            </div>
        </div>

        {/* Pencarian - Lebih Slim */}
        <div className="max-w-xl mx-auto mb-16 animate-blur-in delay-100">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Cari ${activeType === 'beverage' ? 'minuman' : 'makanan'}...`}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-400 transition-all font-serif-text shadow-sm"
                />
            </div>
        </div>
        
        {/* Grid Katalog - Pangkas ukuran kartu */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredItems.map((item, index) => (
                <MenuItem 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    onViewDetail={setSelectedItem}
                />
            ))}
        </div>

        {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-stone-50 rounded-[2.5rem] border border-stone-100 animate-blur-in">
                <p className="text-stone-400 font-serif italic text-lg">Menu tidak ditemukan.</p>
            </div>
        )}
      </div>
      
      <ProductDetailModal 
        isOpen={!!selectedItem} 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
};

export default Menu;
