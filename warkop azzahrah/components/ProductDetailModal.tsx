import React from 'react';
import { CoffeeItem } from '../types';

interface ProductDetailModalProps {
  item: CoffeeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-end justify-center bg-stone-950/80 p-0 backdrop-blur-md md:items-center md:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[3rem] bg-[#fdfbf7] shadow-2xl md:max-h-[85vh] md:flex-row md:rounded-[3.5rem] animate-in slide-in-from-bottom-10 duration-500"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-20 rounded-full bg-white/80 p-3 backdrop-blur-md transition-transform hover:scale-110 md:hidden"
        >
          <svg className="h-6 w-6 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-[40vh] w-full shrink-0 md:h-auto md:w-5/12">
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent md:hidden" />
            <div className="absolute bottom-8 left-8">
                <span className="bg-stone-900 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white">
                    {item.type === 'food' ? 'Kitchen Menu' : 'Signature Drinks'}
                </span>
            </div>
        </div>

        <div className="flex w-full flex-col overflow-y-auto p-8 sm:p-12 md:p-16">
            <header className="mb-8">
                <div className="flex items-start justify-between gap-6">
                    <h2 className="text-4xl font-bold leading-[0.9] tracking-tighter text-stone-900 sm:text-6xl">{item.name}</h2>
                    <button onClick={onClose} className="hidden md:block rounded-full border border-stone-200 p-4 transition-all hover:bg-stone-900 hover:text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="mt-6 text-3xl font-serif-elegant italic text-amber-600">{formatCurrency(item.price)}</p>
            </header>

            <div className="flex-grow space-y-10">
                <div className="animate-reveal">
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4">The Story</h4>
                    <p className="text-stone-600 text-lg leading-relaxed font-serif-text italic">{item.description}</p>
                </div>
                
                <div className="pt-10 border-t border-stone-200/60 animate-reveal delay-100">
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4">Experience</h4>
                    <p className="text-stone-500 leading-relaxed text-sm bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                      {item.details}
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <button
                    onClick={onClose}
                    className="group relative w-full overflow-hidden rounded-full bg-stone-900 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-amber-600 active:scale-[0.98]"
                >
                    <span className="relative z-10">Return to Catalog</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
