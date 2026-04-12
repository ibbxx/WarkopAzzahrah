import React, { useMemo, useState } from 'react';
import { useMenu } from '../MenuContext';
import { CoffeeItem } from '../types';
import ProductDetailModal from './ProductDetailModal';

interface MenuPageProps {
  onNavigateHome: () => void;
}

type MenuFilter = 'all' | 'beverage' | 'food';

const phoneNumber = "62085256669994";
const displayPhone = "+62 852-5666-9994";
const address = "Bontoa, Mandai, Maros Regency";
const hours = "08:00 - 22:00 WIB";
const websiteUrl = 'WWW.WARKOPAZZAHRA.COM';

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

  const renderMenuItem = (item: CoffeeItem, index: number) => {
    const isEven = index % 2 === 0;

    return (
      <div key={item.id} className="animate-item" style={{ animationDelay: `${index * 80}ms` }}>
        <div className={`flex items-center gap-4 sm:gap-12 py-8 sm:py-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`w-[65%] space-y-2 sm:space-y-4 ${isEven ? 'text-left' : 'text-right'}`}>
            <div className={`flex items-center gap-3 sm:gap-6 ${isEven ? 'justify-start' : 'justify-end'}`}>
               <h3 className="text-base sm:text-4xl font-extrabold uppercase tracking-tighter text-black leading-tight">
                 {item.name}
               </h3>
               {isEven && (
                 <div className="price-circle">
                    {item.price / 1000}
                 </div>
               )}
            </div>
            
            <p className="text-[11px] sm:text-lg text-stone-800 leading-snug sm:leading-relaxed font-semibold">
              {item.description}
            </p>
            
            {!isEven && (
               <div className="flex justify-end pt-1">
                  <div className="price-circle">
                    {Math.round(item.price / 1000)}
                  </div>
               </div>
            )}

            <button 
              onClick={() => setSelectedItem(item)}
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-black transition-colors"
            >
              DETAILS —
            </button>
          </div>

          <div className="w-[35%] flex justify-center">
            <div className="relative w-full aspect-square rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-xl border border-stone-200 bg-white">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="divider-line" />
      </div>
    );
  };

  return (
    <div className="bg-paper-premium min-h-screen text-black pt-8 sm:pt-20 pb-20 selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <header className="text-center mb-12 sm:mb-32 space-y-2 sm:space-y-4">
          <h1 className="font-cursive text-6xl sm:text-[120px] text-black leading-none py-2">Azzahra</h1>
          <div className="brush-banner">
             <h2 className="text-2xl sm:text-6xl font-black uppercase tracking-[0.15em] leading-none">Food Menu</h2>
          </div>
          
          <div className="pt-8 flex flex-col items-center gap-4">
             <div className="flex gap-4">
                {['all', 'beverage', 'food'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type as MenuFilter)}
                    className={`text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] transition-all pb-1 border-b-2 ${
                      activeFilter === type ? 'border-black text-black' : 'border-transparent text-stone-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
             </div>
             <input 
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="SEARCH MENU..."
               className="bg-transparent border-b-2 border-stone-300 text-center py-2 text-[11px] sm:text-sm outline-none w-full max-w-[200px] focus:border-black transition-all uppercase tracking-widest font-bold text-black"
             />
          </div>
        </header>

        <div className="space-y-2">
          {filteredItems.map((item, index) => renderMenuItem(item, index))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-cursive text-3xl text-stone-400">Nothing found...</p>
          </div>
        )}

        {/* Footer Synchronized with Main Website */}
        <footer className="mt-32 pt-12 border-t-4 border-black space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4">Location</h4>
                 <p className="font-extrabold text-sm sm:text-lg leading-tight">{address}</p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4">Delivery Order</h4>
                 <p className="font-extrabold text-sm sm:text-lg leading-tight">{displayPhone}</p>
                 <p className="text-[10px] font-bold text-stone-400 mt-2 italic">Tersedia untuk pesanan online</p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4">Opening Hours</h4>
                 <p className="font-extrabold text-sm sm:text-lg leading-tight">{hours}</p>
                 <p className="text-[10px] font-bold text-stone-400 mt-2 italic">Senin - Minggu</p>
              </div>
           </div>
           
           <div className="pt-12 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-8">
              <p className="text-[11px] sm:text-sm font-black uppercase tracking-[0.5em] text-black">{websiteUrl}</p>
              <button 
                onClick={onNavigateHome}
                className="text-[10px] font-black uppercase tracking-[0.2em] px-10 py-4 bg-stone-900 text-white hover:bg-black transition-all rounded-lg shadow-xl"
              >
                BACK TO WEBSITE
              </button>
           </div>
        </footer>
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
