import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import cloudinary from "@/app/lib/cloudinary";

// GET /api/gallery?branchId=xxx
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const branchId = searchParams.get("branchId");

        if (!branchId) {
            return NextResponse.json(
                { error: "branchId is required" },
                { status: 400 }
            );
        }

        const gallery = await Gallery.findOne({ branchId }).lean();

        if (!gallery) {
            const newGallery = await Gallery.create({ branchId, images: [] });
            return NextResponse.json({
                success: true,
                count: 0,
                data: newGallery
            });
        }

        return NextResponse.json({
            success: true,
            count: gallery.images?.length || 0,
            data: gallery
        });

    } catch (error) {
        console.error("Gallery GET error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch gallery images"
            },
            { status: 500 }
        );
    }
}

// Helper function to convert stream to buffer
async function streamToBuffer(stream) {
    const chunks = [];
    const reader = stream.getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

// POST /api/gallery
export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();
        const branchId = formData.get("branchId");
        const files = formData.getAll("images");

        console.log("📦 Received branchId:", branchId);
        console.log("📦 Received files count:", files.length);

        // Validation
        if (!branchId) {
            return NextResponse.json(
                { error: "Branch ID is required" }, 
                { status: 400 }
            );
        }

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "At least one image is required" },
                { status: 400 }
            );
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            return NextResponse.json(
                { error: "Only JPEG, PNG, and WebP images are allowed" },
                { status: 400 }
            );
        }

        // Upload to Cloudinary
        const uploadPromises = files.map(async (file) => {
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                console.log(`📤 Uploading file: ${file.name}, size: ${buffer.length} bytes`);

                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: `gallery/${branchId}`,
                            transformation: [
                                { quality: "auto" },
                                { fetch_format: "auto" }
                            ]
                        },
                        (error, result) => {
                            if (error) {
                                console.error("❌ Cloudinary upload error:", error);
                                return reject(error);
                            }
                            console.log("✅ Uploaded to Cloudinary:", result.secure_url);
                            resolve(result.secure_url);
                        }
                    );

                    uploadStream.end(buffer);
                });
            } catch (error) {
                console.error(`❌ Error processing file ${file.name}:`, error);
                throw error;
            }
        });

        // Wait for all uploads
        const imageUrls = await Promise.all(uploadPromises);
        console.log("✅ All images uploaded:", imageUrls.length);

        // Database update - Two-step approach (MOST RELIABLE)
        const existingGallery = await Gallery.findOne({ branchId });

        let gallery;

        if (!existingGallery) {
            // Create new gallery
            gallery = await Gallery.create({
                branchId,
                images: imageUrls
            });
            console.log("📝 Created new gallery with", gallery.images.length, "images");
        } else {
            // Update existing gallery
            gallery = await Gallery.findOneAndUpdate(
                { branchId },
                { $push: { images: { $each: imageUrls } } },
                { new: true }
            );
            console.log("📝 Updated gallery, now has", gallery.images.length, "images");
        }

        console.log("✅ Database saved successfully");

        return NextResponse.json({
            success: true,
            message: `${imageUrls.length} image(s) uploaded successfully`,
            count: gallery.images.length,
            data: {
                _id: gallery._id,
                branchId: gallery.branchId,
                images: gallery.images,
                createdAt: gallery.createdAt,
                updatedAt: gallery.updatedAt
            }
        }, { status: 201 });

    } catch (error) {
        console.error("❌ Gallery POST error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to upload images"
            },
            { status: 500 }
        );
    }
}