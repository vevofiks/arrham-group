import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        console.log("Updating project with ID:", id);

        const formData = await request.formData();

        console.log("=== FORM DATA RECEIVED ===");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        console.log("==========================");

        // Extract fields
        const name = formData.get("name");
        const location = formData.get("location");
        const status = formData.get("status");
        const description = formData.get("description");
        const mainContractor = formData.get("mainContractor") || "";
        const clientName = formData.get("clientName");

        // Validate clientName if it's being updated
        if (clientName !== null && !clientName) {
          return NextResponse.json(
            { error: "clientName is required" },
            { status: 400 }
          );
        }

        console.log("Update data:", { name, location, status, description, mainContractor, clientName });

        const existingImages = formData.getAll("existingImages") || [];
        console.log("Existing images:", existingImages);

        // Handle new uploads
        const newImages = [];
        const files = formData.getAll("images");
        console.log("New image files:", files.length);

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

                newImages.push(uploaded.secure_url);
            }
        }

        const finalImages = [...existingImages, ...newImages];
        console.log("Final images:", finalImages);

        const updateData = {
            name,
            location,
            status,
            description,
            mainContractor,
            clientName,
            images: finalImages
        };

        // Update project by MongoDB _id
        const project = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

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
        const { id } = await params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Deleted project" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}