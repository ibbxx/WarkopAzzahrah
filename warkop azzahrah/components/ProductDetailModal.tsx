
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
      className="fixed inset-0 bg-stone-950/80 z-[110] flex justify-center items-center p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-blur-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-72 md:h-auto relative">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-900">
                    {item.type === 'food' ? 'Kategori Makanan' : 'Kategori Minuman'}
                </span>
            </div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-4xl font-bold text-stone-900 font-serif leading-tight">{item.name}</h2>
                <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <svg className="h-6 w-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="text-2xl font-black text-amber-600 mb-8">{formatCurrency(item.price)}</p>

            <div className="space-y-6 flex-grow">
                <div>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Deskripsi Singkat</h4>
                    <p className="text-stone-600 leading-relaxed font-serif-text">{item.description}</p>
                </div>
                
                <div className="pt-6 border-t border-stone-100">
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Komposisi & Rasa</h4>
                    <p className="text-stone-500 leading-relaxed text-sm italic">{item.details}</p>
                </div>
            </div>

            <div className="mt-12">
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
