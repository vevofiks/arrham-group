import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";



export async function GET(request) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");

    const query = branchId ? { branchId } : {};
    const projects = await Project.find(query);

    return NextResponse.json(projects);
}


export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();
        const branchId = formData.get("branchId");
        const name = formData.get("name");
        const location = formData.get("location");
        const status = formData.get("status");

        const files = formData.getAll("images");
        const uploadedUrls = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

            const uploadRes = await cloudinary.uploader.upload(base64String, {
                folder: "projects",
            });

            uploadedUrls.push(uploadRes.secure_url);
        }

        const newProject = await Project.create({
            branchId,
            name,
            location,
            status,
            images: uploadedUrls,
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}