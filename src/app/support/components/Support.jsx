import React from 'react';
import { supportData } from '../data';
import { Montserrat as MontserratFont } from "next/font/google";
import { Handshake } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function Support() {
  return (
    <div className="min-h-screen text-white pt-20">
      <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">

          {supportData.title} <Handshake className='inline mt-1' size={30} />

        </h1>
        <p className={`text-center text-gray-300 mb-10 max-w-2xl mx-auto text-2xl ${montserrat}`}>
          {supportData.description}
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 md:mb-8 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 sm:gap-8">
          {supportData.sections.map((section, index) => {
            const phoneNumber = section.contact.phone.replace(/\D/g, ''); // Remove non-digits
            const message = encodeURIComponent(`Hello, I need assistance with ${section.title.toLowerCase()}. Can you help me?`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            return (

              <div
                key={index}
                className="relative rounded-2xl border border-emerald-400/40 
                  bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-800/30 
                  backdrop-blur-md shadow-lg shadow-black/20
                  p-5 hover:shadow-emerald-900/30 hover:border-emerald-400/60
                  transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <h3 className="text-white font-semibold text-lg group-hover:text-emerald-300 transition-colors mb-3">
                  {section.title}
                </h3>

                <p className={`text-gray-300 mb-4 ${montserrat.className}`} >{section.description}</p>
                <div className='flex justify-center items-center' >

                  <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded-lg border-2 border-emerald-400 bg-emerald-500/10 
                        px-4 py-2 text-sm font-semibold text-emerald-300 cursor-pointer
                        hover:bg-emerald-400/20 hover:text-white hover:border-emerald-300 
                        transition-colors duration-200"
                    >
                      Connect <FaWhatsapp className='inline ml-2' size={20} />
                    </a> 
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Support;