import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Partners from "@/app/models/Partners";
import Branch from "@/app/models/Branch";
import cloudinary from "@/app/lib/cloudinary";



export async function getAllPartners() {
  try {
    await connectDB();
    const partners = await Partners.find();
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Error fetching all partners:", error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}


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

    const partners = await Partners.find({ branchId });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
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
    const url = formData.get("url") || "";
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

    let imageUrl = "";
    if (imgFile) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const base64String = `data:${imgFile.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64String, {
        folder: "partners",
      });
      imageUrl = uploadRes.secure_url;
    }

    const partner = await Partners.create({ branchId, name, img: imageUrl, url });
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}


