'use client';
import React from 'react'
import AboutUs from './components/AboutUs'
import CompanyGoals from './components/CompanyGoals'
import { AboutData } from '../data'
import { motion } from 'motion/react';
import Contact from '../components/Contact'
import CardFlip from './components/Companies';
import { branchesData } from '..';

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
        <h2 className="text-2xl text-white md:text-5xl font-extrabold tracking-tight uppercase">
          Our <span className="text-lgreen uppercase">Companies</span>
        </h2>
        <motion.div
          className="w-24 h-1.5 bg-gradient-to-r from-lgreen to-teal-400 mt-6 rounded-full mx-auto"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-5 justify-items-center mt-20">
          {branchesData.branches.map((branch) => (
            <CardFlip key={branch.id} branch={branch} />
          ))}
        </div>

      </div>
      <Contact />
    </>
  )
}

export default page