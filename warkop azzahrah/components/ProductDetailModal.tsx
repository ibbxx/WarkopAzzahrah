
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
      className="fixed inset-0 z-[110] flex items-end justify-center bg-stone-950/80 p-0 backdrop-blur-md md:items-center md:p-4"
      onClick={onClose}
    >
      <div 
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl animate-blur-in md:max-h-[90vh] md:flex-row md:rounded-[2.5rem]"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-900">
                    {item.type === 'food' ? 'Kategori Makanan' : 'Kategori Minuman'}
                </span>
            </div>
        </div>

        <div className="flex w-full flex-col overflow-y-auto p-6 sm:p-8 md:w-1/2 md:p-10">
            <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">{item.name}</h2>
                <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-stone-100">
                    <svg className="h-6 w-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="mb-6 text-2xl font-black text-amber-600 sm:mb-8">{formatCurrency(item.price)}</p>

            <div className="flex-grow space-y-6">
                <div>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Deskripsi Singkat</h4>
                    <p className="text-stone-600 leading-relaxed font-serif-text">{item.description}</p>
                </div>
                
                <div className="pt-6 border-t border-stone-100">
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Komposisi & Rasa</h4>
                    <p className="text-stone-500 leading-relaxed text-sm italic">{item.details}</p>
                </div>
            </div>

            <div className="mt-8 sm:mt-12">
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg"
                >
                    Kembali Ke Menu
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
