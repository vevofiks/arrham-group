import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import KeyPersonnel from "@/app/models/KeyPersonnel";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name");
    const position = formData.get("position");
    const description = formData.get("description");
    const yearOfExperience = formData.get("yearOfExperience");
    const imgFile = formData.get("profileImage");

    console.log("=== UPDATE KEY PERSONNEL ===");
    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Position:", position);
    console.log("Description:", description);
    console.log("Year of Experience:", yearOfExperience);
    console.log("============================");

    const update = {};
    if (name !== null && name !== "") update.name = name;
    if (position !== null && position !== "") update.position = position;
    if (description !== null && description !== "") update.description = description;
    if (yearOfExperience !== null && yearOfExperience !== "") update.yearOfExperience = parseInt(yearOfExperience);

    // Validate description length if provided (max 35 characters)
    if (description !== null && description.length > 35) {
      return NextResponse.json(
        { error: "Description must not exceed 35 characters" },
        { status: 400 }
      );
    }

    // Validate year of experience if provided (max 45)
    if (yearOfExperience !== null) {
      const years = parseInt(yearOfExperience);
      if (years > 45) {
        return NextResponse.json(
          { error: "Years of experience cannot exceed 45" },
          { status: 400 }
        );
      }
    }

    if (imgFile) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const base64String = `data:${imgFile.type};base64,${buffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64String, {
        folder: "key-personnel",
      });
      update.profileImage = uploadRes.secure_url;
    }

    console.log("Update object:", update);

    const keyPersonnel = await KeyPersonnel.findByIdAndUpdate(id, update, { new: true });
    if (!keyPersonnel) {
      return NextResponse.json({ error: "Key Personnel not found" }, { status: 404 });
    }

    return NextResponse.json(keyPersonnel);
  } catch (error) {
    console.error("Error updating key personnel:", error);
    return NextResponse.json({ error: "Failed to update key personnel" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const keyPersonnel = await KeyPersonnel.findByIdAndDelete(id);
    if (!keyPersonnel) {
      return NextResponse.json({ error: "Key Personnel not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted key personnel" });
  } catch (error) {
    console.error("Error deleting key personnel:", error);
    return NextResponse.json({ error: "Failed to delete key personnel" }, { status: 500 });
  }
}

