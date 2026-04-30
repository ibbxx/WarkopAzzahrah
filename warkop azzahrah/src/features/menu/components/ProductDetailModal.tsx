import { formatCompactPrice } from '../../../lib/format';
import { MenuItem } from '../../../types/menu';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({
  item,
  isOpen,
  onClose,
}: ProductDetailModalProps) => {
  if (!isOpen || !item) {
    return null;
  }

  return (
    <div
      className="animate-in fixed inset-0 z-[110] flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-md fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-paper-premium animate-in max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border-4 border-black shadow-[0_0_100px_rgba(0,0,0,0.2)] zoom-in-95 duration-500 sm:rounded-[4rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative p-8 sm:p-16">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 rounded-full p-2 transition-colors hover:bg-stone-100"
          >
            <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col gap-12">
            <div className="space-y-4 text-center">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-stone-400 uppercase sm:text-xs">
                Authentic Catalog
              </h4>
              <h2 className="font-cursive text-6xl leading-none text-black sm:text-9xl">
                {item.name}
              </h2>
              <div className="flex justify-center pt-4">
                <div className="brush-banner">
                  <span className="text-lg font-black tracking-[0.2em] uppercase sm:text-2xl">
                    Product Details
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border-2 border-black shadow-2xl sm:rounded-[3rem]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-6 bottom-6">
                  <div className="price-circle !h-20 !w-20 !text-2xl shadow-2xl">
                    {formatCompactPrice(item.price)}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h4 className="inline-block border-b-2 border-black pb-1 text-xs font-black tracking-[0.3em] text-black uppercase">
                    Description
                  </h4>
                  <p className="text-lg leading-relaxed font-medium text-stone-800 italic sm:text-xl">
                    &quot;{item.description}&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="inline-block border-b-2 border-black pb-1 text-xs font-black tracking-[0.3em] text-black uppercase">
                    Additional Info
                  </h4>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {item.details ||
                      'Disajikan dengan penuh rasa dan keikhlasan oleh tim Warkop Azzahra. Harap tanyakan ketersediaan stok kepada kru kami.'}
                  </p>
                </div>

                <div className="w-full pt-8">
                  <button
                    onClick={onClose}
                    className="w-full rounded-2xl bg-black py-5 text-[12px] font-black tracking-[0.4em] text-white uppercase shadow-xl transition-all hover:bg-stone-800 active:scale-95"
                  >
                    CLOSE SELECTION
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-black tracking-[0.5em] text-stone-300 uppercase">
                WARKOP AZZAHRA EST. 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
