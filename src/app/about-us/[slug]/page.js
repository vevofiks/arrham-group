'use client'
import React from 'react';
import CompanyDetails from './CompanyDetails';
import { branchesData } from '@/app';
function page({params}){
  
  const {slug} = React.use(params)
  const data = branchesData.branches.find(branch => branch.id == slug)
  return (
    <div className='mt-32'>
      <CompanyDetails companyData={data} />
    </div>
  )
}
export default page