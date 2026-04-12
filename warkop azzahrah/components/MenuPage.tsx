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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeFilter === 'all' ? true : item.type === activeFilter;
      return matchesSearch && matchesType;
    });
  }, [activeFilter, menuItems, searchQuery]);

  const featuredItems = useMemo(() => {
    return menuItems.filter((item) => item.category === 'best-seller').slice(0, 5);
  }, [menuItems]);

  const beverageItems = useMemo(() => filteredItems.filter((item) => item.type === 'beverage'), [filteredItems]);
  const foodItems = useMemo(() => filteredItems.filter((item) => item.type === 'food'), [filteredItems]);

  const renderProductCard = (item: CoffeeItem, index: number, variant: 'standard' | 'large' | 'minimal' = 'standard') => {
    const isLarge = variant === 'large';
    const isMinimal = variant === 'minimal';

    return (
      <button
        key={item.id}
        onClick={() => setSelectedItem(item)}
        className={`group relative animate-reveal flex flex-col items-start text-left transition-all duration-500 hover:-translate-y-1 ${
          isLarge ? 'md:col-span-2 md:row-span-2' : ''
        }`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className={`relative w-full overflow-hidden transition-all duration-500 bg-stone-100 ${
          isLarge ? 'aspect-[4/5] rounded-[2.5rem]' : 
          isMinimal ? 'aspect-square rounded-[1.5rem]' : 'aspect-square rounded-[2rem]'
        } group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Artisanal Badge */}
          {item.category !== 'standard' && (
            <div className="absolute left-4 top-4 overflow-hidden rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                {item.category === 'best-seller' ? 'Signature' : 'New'}
              </span>
            </div>
          )}

          {/* Price Stamp */}
          <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
             <div className="rounded-2xl bg-stone-900 px-4 py-2 text-white shadow-xl">
                <p className="text-xs font-black tracking-tight">{formatCurrency(item.price)}</p>
             </div>
          </div>
        </div>

        <div className="mt-4 w-full px-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-bold text-stone-900 leading-tight ${isLarge ? 'text-2xl' : 'text-base'}`}>
              {item.name}
            </h3>
            {!isLarge && (
              <span className="shrink-0 font-serif-elegant text-lg text-amber-700">{formatCurrency(item.price)}</span>
            )}
          </div>
          {!isMinimal && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500 font-serif-text italic">
              {item.description}
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="bg-grainy min-h-screen bg-[#fdfbf7] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <div className="mx-auto max-w-[1400px] px-4 pb-48 pt-6 sm:px-8">
        
        {/* Editorial Header */}
        <header className={`sticky top-6 z-50 mb-12 flex items-center justify-between rounded-[2.5rem] border border-stone-200/60 bg-white/80 p-3 backdrop-blur-2xl transition-all duration-500 ${
          isScrolled ? 'shadow-xl' : 'shadow-none'
        }`}>
          <div className="flex items-center gap-4 pl-4">
             <div className="h-10 w-10 overflow-hidden rounded-xl bg-stone-900 rotate-3 transition-transform hover:rotate-0">
                <img src="/asset/minuman/ice kopi aren.PNG" alt="Logo" className="h-full w-full object-cover scale-150" />
             </div>
             <div>
               <h1 className="text-xl font-bold tracking-tight text-stone-900">Warkop <span className="font-serif-elegant italic text-amber-600 text-2xl leading-none">Azzahra</span></h1>
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Arisan Coffee & Kitchen</p>
             </div>
          </div>
          
          <button
            onClick={onNavigateHome}
            className="hidden sm:flex items-center gap-2 rounded-full border border-stone-200 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-stone-700 transition-all hover:bg-stone-50 hover:border-stone-900"
          >
            Go Back Home
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-12 rounded-full bg-stone-900 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:hidden"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </header>

        <section className="relative mb-20">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 block mb-4">Official Catalog</span>
                <h2 className="text-5xl sm:text-7xl font-bold text-stone-900 leading-[0.9] tracking-tighter mb-8">
                  Pilih rasa <br/>
                  <span className="font-serif-elegant italic text-amber-600">terbaikmu.</span>
                </h2>
                <p className="text-lg text-stone-500 leading-relaxed max-w-sm font-serif-text italic">
                  Eksplorasi pilihan kopi & menu otentik kami yang disiapkan dengan cinta.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                 <div className="relative group overflow-hidden rounded-[3rem] border border-stone-200/60 p-2 shadow-2xl bg-white rotate-2 transition-transform hover:rotate-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Apa yang ingin kamu nikmati hari ini?"
                      className="w-full rounded-[2.5rem] bg-stone-50 px-8 py-5 text-lg outline-none transition-all focus:bg-white"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-stone-900 rounded-full text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                 </div>
                 
                 <div className="flex flex-wrap gap-2 mt-4 ml-4">
                    {['all', 'beverage', 'food'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setActiveFilter(type as MenuFilter)}
                        className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                          activeFilter === type 
                          ? 'bg-stone-900 text-white shadow-xl -translate-y-1' 
                          : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
                        }`}
                      >
                        {type === 'all' ? 'Everything' : type === 'beverage' ? 'Beverages' : 'Kitchen'}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Bento Grid for Featured */}
        {searchQuery === '' && activeFilter === 'all' && (
          <section className="mb-24">
            <div className="flex items-end justify-between mb-8">
               <div>
                  <span className="font-serif-elegant text-2xl text-amber-700 italic">Chef's Picks</span>
                  <h3 className="text-4xl font-bold tracking-tight">Best Sellers</h3>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {featuredItems.map((item, idx) => 
                 renderProductCard(item, idx, idx === 0 ? 'large' : 'standard')
               )}
            </div>
          </section>
        )}

        {/* Standard Menu Sections */}
        <div className="space-y-32">
          {(activeFilter === 'all' || activeFilter === 'beverage') && beverageItems.length > 0 && (
            <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-12 sm:gap-20">
               <div className="sticky top-32 h-fit">
                  <h2 className="text-6xl font-bold tracking-tighter opacity-10 uppercase -rotate-90 origin-left translate-y-24 hidden lg:block">Beverages</h2>
                  <div className="lg:mt-0">
                    <span className="text-amber-600 font-serif-elegant text-2xl italic">Classic & Signature</span>
                    <h3 className="text-4xl font-bold mt-2">Daftar Minuman</h3>
                    <p className="mt-4 text-stone-500 font-serif-text italic text-sm border-l-2 border-stone-200 pl-4">
                      Dari biji kopi pilihan hingga racikan minuman segar untuk harimu.
                    </p>
                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {beverageItems.map((item, idx) => renderProductCard(item, idx, 'minimal'))}
               </div>
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'food') && foodItems.length > 0 && (
            <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-12 sm:gap-20">
               <div className="sticky top-32 h-fit">
                  <h2 className="text-6xl font-bold tracking-tighter opacity-10 uppercase -rotate-90 origin-left translate-y-24 hidden lg:block">Kitchen</h2>
                  <div>
                    <span className="text-amber-600 font-serif-elegant text-2xl italic">Hearty & Tasty</span>
                    <h3 className="text-4xl font-bold mt-2">Daftar Makanan</h3>
                    <p className="mt-4 text-stone-500 font-serif-text italic text-sm border-l-2 border-stone-200 pl-4">
                      Menu dapur kami yang disiapkan segar setiap pesanan tiba.
                    </p>
                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {foodItems.map((item, idx) => renderProductCard(item, idx, 'minimal'))}
               </div>
            </div>
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-stone-200 rounded-[3rem]">
            <p className="font-serif-elegant text-3xl italic text-amber-600 mb-2">Oops!</p>
            <h3 className="text-2xl font-bold">Menu tidak ditemukan</h3>
            <p className="text-stone-500 mt-2">Coba gunakan kata kunci lain seperti "Kopi" atau "Nasi".</p>
          </div>
        )}
      </div>

      {/* Modern Floating Action Bar */}
      <div className="fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-2 rounded-full border border-stone-200/50 bg-white/80 p-2 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] backdrop-blur-3xl pointer-events-auto">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 rounded-full h-12 px-6 text-[10px] font-black uppercase tracking-widest text-stone-600 transition hover:bg-stone-50"
          >
            Website
          </button>
          <div className="w-px h-8 bg-stone-200 mx-1" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full h-12 px-8 bg-stone-900 border border-stone-900 text-white transition-all hover:bg-amber-600 hover:border-amber-600"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Order Now</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
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
