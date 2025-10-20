import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Projects from "@/app/models/Projects";
import Brands from "@/app/models/Brands";
import Clients from "@/app/models/Clients";
import Partners from "@/app/models/Partners";
import Certifications from "@/app/models/Certifications";

export async function GET() {
    console.log('get inside stat count function')
  try {
    await connectDB();

    const [projects, brands, clients, partners, certifications] = await Promise.all([
      Projects.countDocuments({ status: "Completed" }),
      Brands.countDocuments({}),
      Clients.countDocuments({}),
      Partners.countDocuments({}),
      Certifications.countDocuments({}),
    ]);

    return NextResponse.json({
      projects,
      brands,
      clients,
      partners,
      certifications,
    });
  } catch (error) {
    console.error("Error computing stats:", error);
    return NextResponse.json({ error: "Failed to compute stats" }, { status: 500 });
  }
}


