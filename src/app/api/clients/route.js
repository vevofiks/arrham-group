import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Clients from "@/app/models/Clients";
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

    const clients = await Clients.find({ branchId });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const branchId = formData.get("branchId");
    const companyName = formData.get("companyName");

    if (!branchId || !companyName) {
      return NextResponse.json(
        { error: "branchId and companyName are required" },
        { status: 400 }
      );
    }

    const branch = await Branch.findOne({ id: branchId });
    if (!branch) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    const files = formData.getAll("images") || [];
    const uploadedUrls = [];

    for (const file of files) {
      if (!file) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64String, {
        folder: "clients",
      });
      uploadedUrls.push(uploadRes.secure_url);
    }

    const client = await Clients.create({ branchId, companyName, images: uploadedUrls });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}


