import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const formData = await request.formData();

        // Extract fields
        const name = formData.get("name");
        const location = formData.get("location");
        const status = formData.get("status");
        const branchId = formData.get("branchId");

        // Handle images
        const images = [];
        const files = formData.getAll("images"); // multiple images
        for (const file of files) {
            if (file && file instanceof File) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploaded = await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream({ folder: "projects" }, (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        })
                        .end(buffer);
                });

                images.push(uploaded.secure_url);
            }
        }

        // Update the project
        const updateData = { name, location, status, branch: branchId };
        if (images.length > 0) {
            updateData.$push = { images: { $each: images } }; // append new images
        }

        const project = await Project.findByIdAndUpdate(params.id, updateData, {
            new: true,
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (err) {
        console.error("PUT error:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const project = await Project.findByIdAndDelete(params.id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Deleted project" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
