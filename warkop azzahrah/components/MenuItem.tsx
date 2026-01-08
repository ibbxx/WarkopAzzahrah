
import React, { useState, useRef, useEffect } from 'react';
import { CoffeeItem } from '../types';

interface MenuItemProps {
  item: CoffeeItem;
  index?: number;
  onViewDetail?: (item: CoffeeItem) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, index = 0, onViewDetail }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(amount);

  const animationDelay = `${(index % 12) * 50}ms`;

  return (
    <div 
        ref={elementRef}
        onClick={() => onViewDetail && onViewDetail(item)}
        className={`group relative bg-white rounded-[1.5rem] p-2.5 cursor-pointer border border-stone-100
                   transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl
                   ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}
        style={{ animationDelay: isVisible ? animationDelay : '0ms', animationFillMode: 'forwards' }}
    >
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-stone-50">
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500"></div>
        
        {item.category !== 'standard' && (
            <div className="absolute top-2 left-2">
                <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white shadow-sm ${item.category === 'best-seller' ? 'bg-amber-500' : 'bg-stone-900'}`}>
                    {item.category === 'best-seller' ? 'HOT' : 'NEW'}
                </span>
            </div>
        )}
      </div>
      
      <div className="px-1 text-center">
        <h3 className="text-[12px] font-bold text-stone-900 leading-tight mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
            {item.name}
        </h3>
        <p className="text-[12px] font-black text-amber-600">
            {formatCurrency(item.price)}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
