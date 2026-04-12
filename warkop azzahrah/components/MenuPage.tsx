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
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-700">{subtitle}</p>
            <h2 className="mt-2 text-2xl font-bold text-stone-950">{title}</h2>
          </div>
          <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-500">
            {items.length} item
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="group w-full rounded-[28px] border border-stone-200/80 bg-white/95 p-3 text-left shadow-[0_16px_45px_-32px_rgba(28,25,23,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-28px_rgba(28,25,23,0.6)]"
            >
              <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 sm:grid-cols-[110px_minmax(0,1fr)] xl:grid-cols-[120px_minmax(0,1fr)]">
                <div className="relative h-[88px] w-[88px] overflow-hidden rounded-[22px] bg-stone-100 sm:h-[110px] sm:w-[110px] xl:h-[120px] xl:w-[120px]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.category !== 'standard' && (
                    <span
                      className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white ${
                        item.category === 'best-seller' ? 'bg-amber-500' : 'bg-stone-900'
                      }`}
                    >
                      {item.category === 'best-seller' ? 'Hot' : 'New'}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">
                        {item.type === 'food' ? 'Makanan' : 'Minuman'}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-tight text-stone-950 sm:text-xl">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-[15px]">{item.description}</p>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="text-lg font-black text-amber-600 sm:text-xl">{formatCurrency(item.price)}</p>
                    <span className="rounded-full bg-stone-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      Detail
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#fff4e7_48%,#fffaf5_100%)] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 pb-36 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-30 mb-6 rounded-[28px] border border-white/70 bg-white/85 p-3 shadow-[0_14px_50px_-30px_rgba(28,25,23,0.5)] backdrop-blur-xl sm:top-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-700">Official Menu</p>
              <h1 className="mt-1 truncate text-xl font-bold text-stone-950 sm:text-2xl">
                Warkop <span className="font-serif italic text-amber-600">Azzahra</span>
              </h1>
            </div>

            <button
              type="button"
              onClick={onNavigateHome}
              className="rounded-full border border-stone-200 bg-stone-950 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-amber-600"
            >
              Website
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[34px] bg-stone-950 px-5 py-6 text-white shadow-[0_30px_90px_-40px_rgba(28,25,23,0.9)] sm:px-8 sm:py-8">
          <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

          <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-amber-300">Scan. Pilih. Pesan.</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                Menu digital yang langsung enak dilihat di layar HP.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
                Lihat makanan dan minuman favorit, buka detail tiap menu, lalu lanjutkan pemesanan tanpa harus
                kembali ke halaman utama.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 lg:mt-0">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Total</p>
                <p className="mt-2 text-lg font-black">{menuItems.length}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Favorit</p>
                <p className="mt-2 text-lg font-black">{featuredItems.length}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Akses</p>
                <p className="mt-2 text-lg font-black">24/7</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_60px_-45px_rgba(28,25,23,0.55)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative lg:max-w-md lg:flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari menu favoritmu..."
                className="w-full rounded-[22px] border border-stone-200 bg-stone-50 px-5 py-4 pr-12 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
              />
              <svg
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
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
                  className={`rounded-full px-4 py-3 text-xs font-black uppercase tracking-[0.18em] transition ${
                    activeFilter === button.key
                      ? 'bg-stone-950 text-white shadow-lg'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {button.label} ({button.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {searchQuery.trim().length === 0 && (
          <section className="mt-8 space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-700">Pilihan Favorit</p>
                <h2 className="mt-2 text-2xl font-bold text-stone-950">Best seller yang sering dicari</h2>
              </div>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-500">
                Swipe
              </span>
            </div>

            <div className="grid grid-flow-col auto-cols-[260px] gap-4 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
              {featuredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="snap-start rounded-[28px] border border-stone-200/80 bg-white p-3 text-left shadow-[0_18px_50px_-36px_rgba(28,25,23,0.6)]"
                >
                  <div className="overflow-hidden rounded-[22px]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                      Best Seller
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-stone-950">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
                    <p className="mt-4 text-lg font-black text-amber-600">{formatCurrency(item.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 space-y-8">
          {(activeFilter === 'all' || activeFilter === 'beverage') &&
            renderSection('Minuman', 'Kopi, latte, tea, dan signature drinks', beverageItems)}

          {(activeFilter === 'all' || activeFilter === 'food') &&
            renderSection('Makanan', 'Nasi, mie, snack, dan comfort food', foodItems)}

          {filteredItems.length === 0 && (
            <div className="rounded-[30px] border border-dashed border-stone-300 bg-white/80 px-6 py-14 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-stone-400">Tidak ditemukan</p>
              <h3 className="mt-3 text-2xl font-bold text-stone-900">Menu yang kamu cari belum ada.</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                Coba kata kunci lain, atau buka seluruh kategori untuk melihat daftar lengkap menu yang tersedia.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:bottom-4 sm:px-6">
        <div className="mx-auto flex max-w-xl gap-3 rounded-[28px] border border-stone-200/80 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-30px_rgba(28,25,23,0.45)] backdrop-blur-xl">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-green-600 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-green-700"
          >
            Pesan WhatsApp
          </a>
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex-1 rounded-full border border-stone-200 bg-stone-950 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-amber-600"
          >
            Website Utama
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
