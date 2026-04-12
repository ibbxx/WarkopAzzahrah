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
      className="fixed inset-0 z-[110] flex items-end justify-center bg-white/20 p-0 backdrop-blur-xl md:items-center md:p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] md:h-auto md:max-h-[85vh] md:flex-row md:rounded-3xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Gallery Panel */}
        <div className="relative h-2/5 w-full shrink-0 md:h-auto md:w-1/2">
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute top-6 left-6">
                <span className="bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm border border-stone-100">
                    {item.type === 'food' ? 'Dapur' : 'Minuman'}
                </span>
            </div>
        </div>

        {/* Content Panel */}
        <div className="flex w-full flex-col overflow-y-auto p-8 sm:p-12 md:w-1/2">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-black leading-tight tracking-tighter text-stone-900">{item.name}</h2>
                <div className="w-12 h-1 bg-stone-900" />
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-50 transition-colors"
              >
                <svg className="h-6 w-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-8 flex-grow">
                <div>
                    <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Harga</h4>
                    <p className="text-2xl font-black text-stone-900">{formatCurrency(item.price)}</p>
                </div>
                
                <div>
                    <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Deskripsi</h4>
                    <p className="text-stone-600 leading-relaxed">{item.description}</p>
                </div>

                {item.details && (
                  <div className="pt-8 border-t border-stone-100">
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Detail Tambahan</h4>
                      <p className="text-stone-500 text-sm italic leading-relaxed">{item.details}</p>
                  </div>
                )}
            </div>

            <div className="mt-12">
                <button
                    onClick={onClose}
                    className="w-full bg-stone-900 text-white py-5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
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
