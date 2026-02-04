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
        const newImages = formData.getAll("images") || []; // Expecting URLs now

        const finalMedia = [...existingImages, ...newImages];

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
        return NextResponse.json(
            { error: err.message || "Failed to update project" },
            { status: 400 }
        );
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