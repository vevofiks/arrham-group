'use client';
import React from 'react'
import AboutUs from './components/AboutUs'
import CompanyGoals from './components/CompanyGoals'
import { AboutData } from '../data'
import ServiceCard from '../components/Services';
import { servicesData } from '../data'
import Contact from '../components/Contact'
function page() {

  return (

    <>
      <AboutUs />
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {
          AboutData.map((about, index) => {
            const Icon = about.icon;
            return (<CompanyGoals key={index} title={about.title} content={about.content} Icon={Icon} />)
          })
        }
      </div>
      <div className="max-w-6xl p-20 mx-auto text-center">
        <h2 className="text-3xl text-white md:text-5xl font-extrabold tracking-tight">
          Core <span className="text-lgreen">Services</span>
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
      <Contact />
    </>
  )
}

export default page