import { useState } from 'react';

import { SITE_CONFIG } from '../../../config/site';

const Contact = () => {
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isCareerImageError, setIsCareerImageError] = useState(false);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage,
  )}`;

  return (
    <section
      id="kontak"
      className="border-t border-stone-800 bg-stone-950 py-20 text-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center font-serif text-4xl font-bold text-amber-500">
          Hubungi &amp; Kunjungi Kami
        </h2>
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full space-y-10 text-center lg:w-1/2 lg:text-left">
            <div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-amber-400">
                Alamat
              </h3>
              <p className="font-light tracking-wide text-stone-300">
                {SITE_CONFIG.contact.address}
                <br />
                {SITE_CONFIG.contact.addressLine2}
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-amber-400">
                Jam Buka
              </h3>
              <p className="font-light tracking-wide text-stone-300">
                {SITE_CONFIG.contact.openingDays}
                <br />
                {SITE_CONFIG.contact.openingHours}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCareerImageError(false);
                  setIsCareerModalOpen(true);
                }}
                className="mt-4 inline-flex items-center font-serif text-2xl font-semibold text-amber-400 transition-colors duration-300 hover:text-amber-300"
              >
                Career
              </button>
              <p className="mt-3 font-light tracking-wide text-stone-300">
                Ingin bergabung bersama tim kami? Klik Career untuk melihat info
                lowongan terbaru.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-2xl font-semibold text-amber-400">
                Pemesanan &amp; Info
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow-[0_0_15px_rgba(22,163,74,0.4)] transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.6)]"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>
                  Pesan via WhatsApp: {SITE_CONFIG.contact.displayPhone}
                </span>
              </a>
            </div>

            <div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-amber-400">
                Ikuti Kami
              </h3>
              <p className="mx-auto mb-4 max-w-md font-light text-stone-300 lg:mx-0">
                Jangan lewatkan update terbaru, promo menarik, dan momen-momen
                seru di Warkop Azzahra. Ikuti kami di Instagram!
              </p>
              <div className="flex justify-center space-x-4 lg:justify-start">
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-stone-400 transition-colors duration-300 hover:scale-110 hover:text-amber-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.148-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.502.012-4.72.068-2.693.123-3.993 1.423-4.116 4.116-.056 1.218-.067 1.578-.067 4.72s.011 3.502.067 4.72c.123 2.693 1.423 3.993 4.116 4.116 1.218.056 1.578.067 4.72.067s3.502-.011 4.72-.067c2.693-.123 3.993-1.423 4.116-4.116.056-1.218.067-1.578.067-4.72s-.011-3.502-.067-4.72c-.123-2.693-1.423-3.993-4.116-4.116-1.218-.056-1.578-.068-4.72-.068zm0 5.467c-1.956 0-3.57 1.614-3.57 3.57s1.614 3.57 3.57 3.57 3.57-1.614 3.57-3.57-1.614-3.57-3.57-3.57zM12 15a3 3 0 110-6 3 3 0 010 6zm6.363-8.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="h-96 w-full lg:w-1/2">
            <iframe
              src={SITE_CONFIG.contact.mapsEmbedUrl}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full rounded-lg border border-stone-700 shadow-lg transition-opacity hover:opacity-100 opacity-90"
              title="Lokasi Warkop Azzahra"
            />
          </div>
        </div>
      </div>

      {isCareerModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Career Poster"
          onClick={() => setIsCareerModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-stone-700 bg-stone-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsCareerModalOpen(false)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
              aria-label="Tutup popup career"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!isCareerImageError ? (
              <img
                src={SITE_CONFIG.assets.careerPoster}
                alt="Poster lowongan kerja Warkop Azzahra"
                className="max-h-[85vh] w-full object-contain"
                onError={() => setIsCareerImageError(true)}
              />
            ) : (
              <div className="p-10 text-center text-stone-200">
                <p className="text-lg font-bold text-amber-300">
                  Poster career belum ditemukan.
                </p>
                <p className="mt-2 text-sm text-stone-300">
                  Simpan file poster ke{' '}
                  <code className="rounded bg-stone-800 px-2 py-1">
                    public/asset/image.png
                  </code>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
