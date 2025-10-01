import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import cloudinary from "@/app/lib/cloudinary";


export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    const gallery = await Gallery.findById(id);
    if (!gallery) {
        return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    // Delete one image
    if (imageUrl) {
        if (!gallery.images.includes(imageUrl)) {
            return NextResponse.json({ error: "Image not found in gallery" }, { status: 404 });
        }

        await deleteFromCloudinary(imageUrl);

        gallery.images = gallery.images.filter((img) => img !== imageUrl);
        await gallery.save();

        return NextResponse.json({
            success: true,
            message: "Image deleted",
            updatedGallery: gallery,
        });
    }

    // Delete entire gallery
    await Promise.all(gallery.images.map(url => deleteFromCloudinary(url)));

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
        success: true,
        message: "Gallery deleted",
        deletedId: id,
    });
}

async function deleteFromCloudinary(url) {
    const cleanUrl = url.split('?')[0];
    const uploadMarker = '/upload/';
    const idx = cleanUrl.indexOf(uploadMarker);
    if (idx === -1) throw new Error("Invalid Cloudinary URL");

    let publicId = cleanUrl.slice(idx + uploadMarker.length);
    publicId = publicId.replace(/^v\d+\//, ""); // strip version
    publicId = publicId.replace(/\.[^/.]+$/, ""); // strip extension

    return cloudinary.uploader.destroy(publicId);
}