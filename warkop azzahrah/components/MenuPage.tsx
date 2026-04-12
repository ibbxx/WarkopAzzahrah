import React, { useMemo, useState } from 'react';
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

const twoLineClamp: React.CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
};

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

  const featuredItems = useMemo(() => {
    return menuItems.filter((item) => item.category === 'best-seller').slice(0, 6);
  }, [menuItems]);

  const beverageItems = useMemo(() => {
    return filteredItems.filter((item) => item.type === 'beverage');
  }, [filteredItems]);

  const foodItems = useMemo(() => {
    return filteredItems.filter((item) => item.type === 'food');
  }, [filteredItems]);

  const filterButtons: { key: MenuFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Semua Menu', count: filteredItems.length },
    {
      key: 'beverage',
      label: 'Minuman',
      count: menuItems.filter((item) => item.type === 'beverage').length,
    },
    {
      key: 'food',
      label: 'Makanan',
      count: menuItems.filter((item) => item.type === 'food').length,
    },
  ];

  const renderSection = (title: string, subtitle: string, items: CoffeeItem[]) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">{subtitle}</p>
            <h2 className="mt-1 text-xl font-bold text-stone-950 sm:text-2xl">{title}</h2>
          </div>
          <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-500">
            {items.length} item
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="group w-full rounded-[24px] border border-stone-200/80 bg-white p-2.5 text-left shadow-[0_12px_35px_-28px_rgba(28,25,23,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-30px_rgba(28,25,23,0.4)]"
            >
              <div className="grid grid-cols-[78px_minmax(0,1fr)] gap-3 sm:grid-cols-[96px_minmax(0,1fr)] xl:grid-cols-[110px_minmax(0,1fr)]">
                <div className="relative h-[78px] w-[78px] overflow-hidden rounded-[18px] bg-stone-100 sm:h-[96px] sm:w-[96px] xl:h-[110px] xl:w-[110px]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.category !== 'standard' && (
                    <span
                      className={`absolute left-1.5 top-1.5 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white ${
                        item.category === 'best-seller' ? 'bg-amber-500' : 'bg-stone-900'
                      }`}
                    >
                      {item.category === 'best-seller' ? 'Hot' : 'New'}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold leading-snug text-stone-950 sm:text-lg">{item.name}</h3>
                    <p
                      className="mt-1.5 text-xs leading-relaxed text-stone-500 sm:text-sm"
                      style={twoLineClamp}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-[15px] font-black text-amber-700 sm:text-lg">{formatCurrency(item.price)}</p>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                      Lihat
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f4ef] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-3 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-30 mb-4 rounded-[24px] border border-stone-200/80 bg-white/92 p-2.5 shadow-[0_12px_32px_-28px_rgba(28,25,23,0.32)] backdrop-blur-xl sm:top-4 sm:mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-stone-400">Official Menu</p>
              <h1 className="mt-1 truncate text-lg font-bold text-stone-950 sm:text-2xl">
                Warkop <span className="font-serif italic text-amber-600">Azzahra</span>
              </h1>
            </div>

            <button
              type="button"
              onClick={onNavigateHome}
              className="rounded-full border border-stone-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-stone-700 transition hover:border-amber-300 hover:text-amber-700"
            >
              Website
            </button>
          </div>
        </header>

        <section className="rounded-[28px] border border-stone-200/80 bg-white px-4 py-4 shadow-[0_14px_40px_-30px_rgba(28,25,23,0.28)] sm:px-6 sm:py-5">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end lg:gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">Scan Menu</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-bold leading-tight text-stone-950 sm:text-3xl">
                Pilih menu favoritmu.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
                Tampilan dibuat ringkas supaya cepat dipahami di layar HP. Ketuk item untuk melihat detail.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 lg:mt-0 lg:justify-end">
              <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Menu</p>
                <p className="mt-0.5 text-sm font-black text-stone-900">{menuItems.length}</p>
              </div>
              <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Favorit</p>
                <p className="mt-0.5 text-sm font-black text-stone-900">{featuredItems.length}</p>
              </div>
              <div className="rounded-full border border-stone-200 bg-stone-50 px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Akses</p>
                <p className="mt-0.5 text-sm font-black text-stone-900">Cepat</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[24px] border border-stone-200/80 bg-white p-3.5 shadow-[0_14px_40px_-32px_rgba(28,25,23,0.28)] sm:mt-6 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative lg:max-w-md lg:flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari menu favoritmu..."
                className="w-full rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3 pr-11 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
              />
              <svg
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.65 10.65Z"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {filterButtons.map((button) => (
                <button
                  key={button.key}
                  type="button"
                  onClick={() => setActiveFilter(button.key)}
                  className={`rounded-full px-3.5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] transition ${
                    activeFilter === button.key
                      ? 'bg-stone-950 text-white shadow-md'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {searchQuery.trim().length === 0 && (
          <section className="mt-6 space-y-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">Pilihan Favorit</p>
                <h2 className="mt-1 text-xl font-bold text-stone-950 sm:text-2xl">Best seller</h2>
              </div>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-500">
                {featuredItems.length} item
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {featuredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="rounded-[22px] border border-stone-200/80 bg-white p-2.5 text-left shadow-[0_12px_35px_-28px_rgba(28,25,23,0.35)] transition hover:-translate-y-0.5"
                >
                  <div className="relative overflow-hidden rounded-[18px]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white">
                      Hot
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-[14px] font-bold leading-snug text-stone-950 sm:text-base">{item.name}</h3>
                    <p className="mt-1 text-[13px] font-black text-amber-700">{formatCurrency(item.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 space-y-7">
          {(activeFilter === 'all' || activeFilter === 'beverage') &&
            renderSection('Minuman', 'Kopi, latte, tea, dan signature drinks', beverageItems)}

          {(activeFilter === 'all' || activeFilter === 'food') &&
            renderSection('Makanan', 'Nasi, mie, snack, dan comfort food', foodItems)}

          {filteredItems.length === 0 && (
            <div className="rounded-[24px] border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">Tidak ditemukan</p>
              <h3 className="mt-2 text-xl font-bold text-stone-900">Menu yang kamu cari belum ada.</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Coba kata kunci lain, atau buka seluruh kategori untuk melihat daftar lengkap menu yang tersedia.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:bottom-4 sm:px-6">
        <div className="mx-auto flex max-w-xl gap-2.5 rounded-[24px] border border-stone-200/80 bg-white/95 p-2.5 shadow-[0_18px_40px_-30px_rgba(28,25,23,0.35)] backdrop-blur-xl">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-green-600 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-green-700"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex-1 rounded-full border border-stone-200 bg-stone-950 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-amber-600"
          >
            Website
          </button>
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
