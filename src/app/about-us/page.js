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
      <div className="grid grid-cols-1 md:grid-cols-2 mb-8 sm:mb-10 md:mb-5">
        {
          AboutData.map((about, index) => {
            const Icon = about.icon;
            return (<CompanyGoals key={index} title={about.title} content={about.content} Icon={Icon} />)
          })
        }
      </div>
      <Contact />
    </>
  )
}

export default page