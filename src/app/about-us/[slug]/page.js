import React from "react";
import CompanyDetails from "./CompanyDetails";
import { branchesData } from "@/app";
import ArrhamHealthcare from "./ArrhamHealthcare";

async function Page({ params }) {
  const { slug } = await params;
  console.log(slug);

  const data = branchesData.branches.find((branch) => branch.id == slug);
  if (data.id === "arrham-healthcare-bahrain"){
    return (
      <div >
        <ArrhamHealthcare imageSrc={"/arrham3.png"} />
      </div>
    )

  }

  return (


    <div className="mt-32">
      <CompanyDetails companyData={data} />
    </div>
  );
}
export default Page;
