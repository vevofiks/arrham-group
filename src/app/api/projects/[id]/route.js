import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Project from "@/app/models/Projects";
import cloudinary from "@/app/lib/cloudinary";

const MAX_IMAGES_PER_UPLOAD = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_IMAGES = 20; // Maximum total images per project

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const formData = await request.formData();

        // Extract fields
        const name = formData.get("name");
        const location = formData.get("location");
        const status = formData.get("status");
        const description = formData.get("description");
        const mainContractor = formData.get("mainContractor") || "";
        const clientName = formData.get("clientName");

        if (clientName !== null && !clientName) {
            return NextResponse.json({ error: "clientName is required" }, { status: 400 });
        }

        const existingImages = formData.getAll("existingImages") || [];
        const newMedia = []; // Changed name to be more generic (Media instead of Images)
        const files = formData.getAll("images"); // Keeping 'images' as key or rename to 'media'

        // Validate new file count
        if (files.length > MAX_IMAGES_PER_UPLOAD) {
            return NextResponse.json(
                { error: `You can upload a maximum of ${MAX_IMAGES_PER_UPLOAD} images at once` },
                { status: 400 }
            );
        }

        // Validate total image count (existing + new)
        const totalImageCount = existingImages.length + files.length;
        if (totalImageCount > MAX_TOTAL_IMAGES) {
            return NextResponse.json(
                { error: `Total images cannot exceed ${MAX_TOTAL_IMAGES}. You have ${existingImages.length} existing images and are trying to add ${files.length} more.` },
                { status: 400 }
            );
        }

        // Validate file sizes
        for (const file of files) {
            if (file && file instanceof File) {
                if (file.size > MAX_FILE_SIZE) {
                    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
                    return NextResponse.json(
                        { error: `File "${file.name}" exceeds the maximum size of 10MB (${fileSizeMB}MB)` },
                        { status: 400 }
                    );
                }
            }
        }

        for (const file of files) {
            if (file && file instanceof File) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploaded = await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            { 
                                folder: "projects", 
                                resource_type: "auto" // CRITICAL: Detects if it's a video or image
                            }, 
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        )
                        .end(buffer);
                });

                newMedia.push(uploaded.secure_url);
            }
        }

        const finalMedia = [...existingImages, ...newMedia];

        const updateData = {
            name,
            location,
            status,
            description,
            mainContractor,
            clientName,
            images: finalMedia // Storing both image and video URLs in the same array
        };

        const project = await Project.findByIdAndUpdate(id, updateData, { new: true });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
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