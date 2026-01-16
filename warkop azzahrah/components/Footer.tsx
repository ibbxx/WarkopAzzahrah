
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800">
      <div className="container mx-auto px-6">

        {/* Main Footer Content - Centered */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-serif mb-6">Warkop <span className="text-amber-500 italic">Azzahra</span></h2>
          <p className="max-w-2xl text-stone-500 leading-relaxed mb-8 text-lg">
            Menghadirkan cita rasa kopi Nusantara terbaik sejak 2024. Kami berdedikasi untuk menyajikan pengalaman minum kopi yang autentik dan hangat.
          </p>


        </div>
      </div>

      <div className="border-t border-stone-800 pt-8 text-center flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Warkop Azzahra. All Rights Reserved.</p>


      </div>

    </footer>
  );
};

export default Footer;
