import React from "react";
import { notFound } from "next/navigation";
import CompanyDetails from "./CompanyDetails";
import { branchesData } from "@/app";
import ArrhamHealthcare from "./ArrhamHealthcare";

async function Page({ params }) {
  const { slug } = await params;
  console.log(slug);

  const data = branchesData.branches.find((branch) => branch.id == slug);
  if (!data) return notFound();
  console.log('company dd' , data)
  if (data.id === "arrham-healthcare-bahrain"){
    return (
      <div >
        <ArrhamHealthcare imageSrc={"/arrham3.png"} />
      </div>
    )
  }
  return (


    <div className="">
      <CompanyDetails companyData={data} />
    </div>
  );
}
export default Page;
