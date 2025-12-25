import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";
import Branch from "@/app/models/Branch";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");

    console.log("Branch ID from frontend:", branchId);

    const branch = await Branch.findOne({ id: branchId });
    if (!branch) {
      return NextResponse.json(
        { error: "Branch not found" },
        { status: 404 }
      );
    }

    const projects = await Project.find({ branchId: branchId });
    console.log("Projects:", projects);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
    const location = formData.get("location");
    const status = formData.get("status");
    const description = formData.get("description");
    const mainContractor = formData.get("mainContractor") || "";
    const clientName = formData.get("clientName");

    if (!clientName) {
      return NextResponse.json({ error: "clientName is required" }, { status: 400 });
    }

    const files = formData.getAll("images"); // This can now contain both images and videos
    const uploadedUrls = [];

    for (const file of files) {
      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

        const uploadRes = await cloudinary.uploader.upload(base64String, {
          folder: "projects",
          resource_type: "auto", // CRITICAL: Detects if it's a video or image
        });

        uploadedUrls.push(uploadRes.secure_url);
      }
    }

    const newProject = await Project.create({
      branchId,
      name,
      location,
      description,
      status,
      mainContractor,
      clientName,
      images: uploadedUrls, // Array contains mixed Image and Video URLs
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}