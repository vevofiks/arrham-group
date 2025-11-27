import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import KeyPersonnel from "@/app/models/KeyPersonnel";
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

    const keyPersonnel = await KeyPersonnel.find({ branchId });
    return NextResponse.json(keyPersonnel);
  } catch (error) {
    console.error("Error fetching key personnel:", error);
    return NextResponse.json(
      { error: "Failed to fetch key personnel" },
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
    const position = formData.get("position");
    const qualification = formData.get("qualification");
    const description = formData.get("description");
    const yearOfExperience = formData.get("yearOfExperience");
    const imgFile = formData.get("profileImage");

    if (!branchId || !name || !position || !qualification || !description || !yearOfExperience || !imgFile) {
      return NextResponse.json(
        { error: "branchId, name, position, qualification, description, yearOfExperience and profileImage are required" },
        { status: 400 }
      );
    }

    // Validate description length (max 35 characters)
    if (description.length > 75) {
      return NextResponse.json(
        { error: "Description must not exceed 75 characters" },
        { status: 400 }
      );
    }

    // Validate year of experience (max 45)
    const years = parseInt(yearOfExperience);
    if (years > 45) {
      return NextResponse.json(
        { error: "Years of experience cannot exceed 45" },
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
        folder: "key-personnel",
      });
      imageUrl = uploadRes.secure_url;
    }

    const keyPersonnel = await KeyPersonnel.create({ 
      branchId, 
      name,
      position,
      qualification,
      profileImage: imageUrl, 
      description,
      yearOfExperience: parseInt(yearOfExperience)
    });
    return NextResponse.json(keyPersonnel, { status: 201 });
  } catch (error) {
    console.error("Error creating key personnel:", error);
    return NextResponse.json(
      { error: "Failed to create key personnel" },
      { status: 500 }
    );
  }
}

