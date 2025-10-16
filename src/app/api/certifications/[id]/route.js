import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Certifications from "@/app/models/Certifications";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const imgFile = formData.get("img");

    const update = {};
    if (name !== null) update.name = name;
    if (description !== null) update.description = description;

    if (imgFile) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const base64String = `data:${imgFile.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64String, {
        folder: "certifications",
      });
      update.img = uploadRes.secure_url;
    }

    const cert = await Certifications.findByIdAndUpdate(id, update, { new: true });
    if (!cert) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json(cert);
  } catch (error) {
    console.error("Error updating certification:", error);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const cert = await Certifications.findByIdAndDelete(id);
    if (!cert) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted certification" });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}


