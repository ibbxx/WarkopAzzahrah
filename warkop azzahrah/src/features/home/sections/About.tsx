import { useRef } from 'react';

import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(sectionRef);

  const processes = [
    {
      id: 1,
      step: '01',
      title: 'Penyortiran Manual',
      description:
        'Hanya biji kopi terbaik yang lolos seleksi ketat tim ahli kami.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      id: 2,
      step: '02',
      title: 'Roasting Presisi',
      description:
        'Proses sangrai batch kecil untuk mengunci karakter rasa Nusantara.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      step: '03',
      title: 'Sajian Sepenuh Hati',
      description:
        'Setiap cangkir adalah karya seni yang diseduh oleh barista kami.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="tentang-kami"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fffaf5] py-32"
    >
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
        <div className="animate-float-gentle absolute top-40 -left-20 h-96 w-96 rounded-full bg-amber-100/40 blur-[120px]" />
        <div className="animate-float-gentle delay-700 absolute right-20 bottom-40 h-80 w-80 rounded-full bg-stone-200/40 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-stone-200/30" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-32 flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="relative h-[400px] w-full md:h-[500px] lg:w-[40%]">
            <div
              className={`absolute top-0 left-0 z-10 h-[90%] w-[85%] overflow-hidden rounded-[2.5rem] shadow-2xl ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                alt="Barista at work"
                className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110"
              />
            </div>

            <div className="animate-bounce-slow absolute -top-4 -right-4 z-30">
              <div className="flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-4 border-white bg-amber-500 shadow-xl">
                <p className="text-center text-[9px] leading-tight font-black tracking-tighter text-white uppercase">
                  Terbaik
                  <br />
                  Lokal
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-[60%]">
            <h2
              className={`font-display mb-8 text-5xl leading-[1] font-bold text-stone-900 md:text-7xl ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
            >
              Seni Dalam <br />{' '}
              <span className="font-serif-text text-amber-600 italic">
                Setiap Tetes.
              </span>
            </h2>

            <div
              className={`font-serif-text space-y-6 text-lg leading-relaxed text-stone-600 md:text-xl ${
                isVisible ? 'animate-blur-in delay-200' : 'opacity-0'
              }`}
            >
              <p>
                Warkop Azzahra bukan sekadar tempat berkumpul; ini adalah
                perayaan rasa. Kami percaya bahwa setiap biji kopi memiliki jiwa
                yang harus dihormati.
              </p>
              <p className="rounded-r-2xl border-l-4 border-amber-500 bg-stone-100/50 py-2 pl-6 text-stone-700 italic">
                &quot;Kami tidak hanya menyajikan kopi, kami menyajikan waktu
                luang yang bermakna dan kehangatan yang tulus.&quot;
              </p>
              <p>
                Dari pegunungan Gayo hingga Toraja, kami membawa keajaiban alam
                Indonesia langsung ke dalam cangkir Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {processes.map((process, index) => (
            <div
              key={process.id}
              className={`group relative rounded-[2.5rem] border border-stone-200 bg-white p-10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="pointer-events-none absolute top-8 right-10 text-6xl font-black text-stone-50 transition-colors group-hover:text-amber-50">
                {process.step}
              </div>

              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-950 text-white shadow-xl shadow-stone-950/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-500">
                {process.icon}
              </div>

              <h4 className="mb-4 font-serif text-2xl font-bold text-stone-900">
                {process.title}
              </h4>
              <p className="text-sm leading-relaxed text-stone-500 transition-colors group-hover:text-stone-700">
                {process.description}
              </p>

              <div className="mt-8 h-1 w-8 bg-stone-100 transition-all duration-700 group-hover:w-full group-hover:bg-amber-300" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(15deg); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
