import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Clients from "@/app/models/Clients";
import Branch from "@/app/models/Branch";

export async function GET(request) {
  try {
    await connectDB();

    const clients = await Clients.find({}).select("images");

    // flatten images to a single array and filter falsy values
    const images = clients.flatMap((c) => (c.images || [])).filter(Boolean);

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching client images:", error);
    return NextResponse.json(
      { error: "Failed to fetch client images" },
      { status: 500 }
    );
  }
}
