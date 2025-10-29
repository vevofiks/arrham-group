import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Partners from "@/app/models/Partners";
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
        folder: "partners",
      });
      update.img = uploadRes.secure_url;
    }

    const partner = await Partners.findByIdAndUpdate(id, update, { new: true });
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const partner = await Partners.findByIdAndDelete(id);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted partner" });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}


