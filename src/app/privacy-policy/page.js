"use client";
import React from 'react';
import Sidebar from '../components/Sidebar';
import { policyData } from './data/policies';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Calendar, Lock } from 'lucide-react';

const page = () => {
  const activeId = useScrollSpy(policyData.map((s) => s.id), 150);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-800 border-b border-gray-700 mt-10">
          <div className="absolute inset-0">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-gray-900/50" />
          </div>
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 ">
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl ">
              <Lock className="inline ml-2 mb-2 text-emerald-400" size={45} /> Privacy Policy
            </h1>
            
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <Sidebar sections={policyData} activeId={activeId} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="prose prose-lg prose-invert max-w-none">
                {policyData.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 mb-16 border-b border-gray-800 pb-16 last:border-0"
                  >
                    <div className="flex items-center gap-3 mb-6">
                    
                        <h2 className="text-3xl font-bold text-white m-0">
                        {section.title}
                        </h2>
                    </div>
                    
                    <div className="text-gray-300 leading-relaxed">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default page;