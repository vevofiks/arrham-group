import React from 'react';
import CompanyDetails from './CompanyDetails';
import { branchesData } from '@/app';
async function Page({params}){
  
  const {slug} = await params;
  console.log(slug)
  const data = branchesData.branches.find(branch => branch.id == slug)
  return (
    <div className='mt-32'>
      <CompanyDetails companyData={data} />
    </div>
  )
}
export default Page