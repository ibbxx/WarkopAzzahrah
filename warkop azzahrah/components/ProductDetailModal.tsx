import React from 'react';
import { CoffeeItem } from '../types';

interface ProductDetailModalProps {
  item: CoffeeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-stone-900/40 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-paper-premium w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] sm:rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] border-4 border-black animate-in zoom-in-95 duration-500"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative p-8 sm:p-16">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-stone-100 transition-colors z-10"
          >
             <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>

          <div className="flex flex-col gap-12">
            {/* Artistic Header Section */}
            <div className="text-center space-y-4">
               <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-stone-400">Authentic Catalog</h4>
               <h2 className="font-cursive text-6xl sm:text-9xl text-black leading-none">{item.name}</h2>
               <div className="flex justify-center pt-4">
                 <div className="brush-banner">
                   <span className="text-lg sm:text-2xl font-black uppercase tracking-[0.2em]">Product Details</span>
                 </div>
               </div>
            </div>

            {/* Content Body: Image and Info side-by-side or stacked cleanly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-black">
                 <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                 <div className="absolute bottom-6 right-6">
                    <div className="price-circle !w-20 !h-20 !text-2xl shadow-2xl">
                       {Math.round(item.price / 1000)}
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-black border-b-2 border-black inline-block pb-1">Description</h4>
                    <p className="text-stone-800 text-lg sm:text-xl leading-relaxed italic font-medium">
                       "{item.description}"
                    </p>
                 </div>

                 <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-black border-b-2 border-black inline-block pb-1">Additional Info</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                       {item.details || "Disajikan dengan penuh rasa dan keikhlasan oleh tim Warkop Azzahra. Harap tanyakan ketersediaan stok kepada kru kami."}
                    </p>
                 </div>

                 <div className="pt-8 w-full">
                    <button
                      onClick={onClose}
                      className="w-full bg-black text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] hover:bg-stone-800 transition-all shadow-xl active:scale-95"
                    >
                      CLOSE SELECTION
                    </button>
                 </div>
              </div>
            </div>
            
            <div className="text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-300">WARKOP AZZAHRA EST. 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
