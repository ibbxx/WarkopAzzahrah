import { FC, useRef } from 'react';

import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';
import { formatCurrency } from '../../../lib/format';
import { MenuItem } from '../../../types/menu';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onViewDetail?: (item: MenuItem) => void;
}

const MenuCard: FC<MenuCardProps> = ({ item, index = 0, onViewDetail }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(elementRef);
  const animationDelay = `${(index % 12) * 50}ms`;

  return (
    <div
      ref={elementRef}
      onClick={() => onViewDetail?.(item)}
      className={`group relative cursor-pointer rounded-[1.5rem] border border-stone-100 bg-white p-2.5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
        isVisible ? 'animate-blur-in' : 'opacity-0'
      }`}
      style={{
        animationDelay: isVisible ? animationDelay : '0ms',
        animationFillMode: 'forwards',
      }}
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-stone-50">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-500 group-hover:bg-stone-900/10" />

        {item.category !== 'standard' && (
          <div className="absolute top-2 left-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[7px] font-black tracking-widest text-white uppercase shadow-sm ${
                item.category === 'best-seller' ? 'bg-amber-500' : 'bg-stone-900'
              }`}
            >
              {item.category === 'best-seller' ? 'HOT' : 'NEW'}
            </span>
          </div>
        )}
      </div>

      <div className="px-1 text-center">
        <h3 className="mb-1 line-clamp-1 text-[12px] leading-tight font-bold text-stone-900 transition-colors group-hover:text-amber-600">
          {item.name}
        </h3>
        <p className="text-[12px] font-black text-amber-600">
          {formatCurrency(item.price)}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
