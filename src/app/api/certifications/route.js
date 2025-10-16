import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Certifications from "@/app/models/Certifications";
import Branch from "@/app/models/Branch";
import cloudinary from "@/app/lib/cloudinary";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");

    if (!branchId) {
      return NextResponse.json(
        { error: "branchId is required" },
        { status: 400 }
      );
    }

    const branch = await Branch.findOne({ id: branchId });
    if (!branch) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    const certs = await Certifications.find({ branchId });
    return NextResponse.json(certs);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const branchId = formData.get("branchId");
    const name = formData.get("name");
    const description = formData.get("description") || "";
    const imgFile = formData.get("img");

    if (!branchId || !name || !imgFile) {
      return NextResponse.json(
        { error: "branchId, name and img are required" },
        { status: 400 }
      );
    }

    const branch = await Branch.findOne({ id: branchId });
    if (!branch) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await imgFile.arrayBuffer());
    const base64String = `data:${imgFile.type};base64,${buffer.toString("base64")}`;
    const uploadRes = await cloudinary.uploader.upload(base64String, {
      folder: "certifications",
    });

    const cert = await Certifications.create({ branchId, name, description, img: uploadRes.secure_url });
    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    console.error("Error creating certification:", error);
    return NextResponse.json(
      { error: "Failed to create certification" },
      { status: 500 }
    );
  }
}


