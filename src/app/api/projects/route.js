import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";
import Branch from "@/app/models/Branch";

const MAX_IMAGES_PER_UPLOAD = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

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

    const imageUrls = formData.getAll("images"); // Expecting strings (URLs) now

    const newProject = await Project.create({
      branchId,
      name,
      location,
      description,
      status,
      mainContractor,
      clientName,
      images: imageUrls, // Array contains mixed Image and Video URLs
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}