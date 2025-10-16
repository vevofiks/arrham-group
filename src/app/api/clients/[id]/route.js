import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Clients from "@/app/models/Clients";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const formData = await request.formData();

    const companyName = formData.get("companyName");

    const existingImages = formData.getAll("existingImages") || [];
    const files = formData.getAll("images") || [];

    const newImageUrls = [];
    for (const file of files) {
      if (file && file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "clients" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });
        newImageUrls.push(uploaded.secure_url);
      }
    }

    const finalImages = [...existingImages, ...newImageUrls];

    const updateData = {};
    if (companyName !== null) updateData.companyName = companyName;
    updateData.images = finalImages;

    const client = await Clients.findByIdAndUpdate(id, updateData, { new: true });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const client = await Clients.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted client" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
  }
}


