import { SITE_CONFIG } from '../../config/site';

const Footer = () => {
  return (
    <footer className="border-t border-stone-800 bg-stone-900 pt-16 pb-8 text-stone-400">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="mb-6 text-4xl font-bold text-white font-serif">
            Warkop <span className="italic text-amber-500">Azzahra</span>
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-stone-500">
            {SITE_CONFIG.copy.footerDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between border-t border-stone-800 pt-8 text-center text-sm md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName}. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
