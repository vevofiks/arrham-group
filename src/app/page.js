import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import ServiceCard from './components/Services'
import { servicesData } from './data'
import Contact from './components/Contact'
import Footer from './components/Footer'

const Page = () => {
  return (
    <div>
      <Hero />
      <About />
      <div
        id="services"
        className="relative bg-black text-white py-20 px-6 md:px-24"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Our <span className="text-lgreen">Services</span>
          </h2>

          <div className="w-24 h-1 bg-lgreen mx-auto my-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  )
}

export default Page
