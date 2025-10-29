import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Brands from "@/app/models/Brands";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name");
    const url = formData.get("url");
    const imgFile = formData.get("img");

    const update = {};
    if (name !== null) update.name = name;
    if (url !== null) update.url = url;

    if (imgFile) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const base64String = `data:${imgFile.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64String, {
        folder: "brands",
      });
      update.img = uploadRes.secure_url;
    }

    const brand = await Brands.findByIdAndUpdate(id, update, { new: true });
    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const brand = await Brands.findByIdAndDelete(id);
    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted brand" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}


